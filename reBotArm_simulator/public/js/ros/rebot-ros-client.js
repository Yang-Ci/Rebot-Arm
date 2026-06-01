(function () {
  class ReBotRosClient extends EventTarget {
    constructor(options) {
      super();
      this.url = options && options.url ? options.url : 'ws://192.168.60.128:9090';
      this.namespace = options && options.namespace ? options.namespace : 'rebotarm';
      this.socket = null;
      this.connected = false;
      this.autoReconnect = true;
      this.reconnectDelay = 1400;
      this._subscriptions = new Map();
      this._advertisedTopics = new Set();
      this._pendingServices = new Map();
      this._nextId = 1;
      this._manualClose = false;
      this._lastMessageAt = new Map();
      this._connectSeq = 0;
    }

    connect(url) {
      if (url) this.url = url;
      this._manualClose = false;
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this._emitStatus('open', 'ROS 已连接');
        return;
      }
      if (this.socket && this.socket.readyState === WebSocket.CONNECTING) return;

      const seq = ++this._connectSeq;
      this._emitStatus('connecting', `正在连接 ${this.url}`);
      this.socket = new WebSocket(this.url);
      const socket = this.socket;

      socket.addEventListener('open', () => {
        if (seq !== this._connectSeq || socket !== this.socket) return;
        this.connected = true;
        this._emitStatus('open', 'ROS 已连接');
        this._resubscribe();
      });

      socket.addEventListener('message', (event) => {
        if (seq === this._connectSeq && socket === this.socket) this._handleMessage(event);
      });
      socket.addEventListener('error', () => {
        if (seq === this._connectSeq && socket === this.socket) this._emitStatus('error', 'ROS WebSocket 出错');
      });
      socket.addEventListener('close', () => {
        if (seq !== this._connectSeq || socket !== this.socket) return;
        this.connected = false;
        this._rejectPendingServices('ROS 连接已断开');
        this._emitStatus('closed', 'ROS 已断开');
        if (!this._manualClose && this.autoReconnect) {
          window.setTimeout(() => this.connect(), this.reconnectDelay);
        }
      });
    }

    disconnect() {
      this._manualClose = true;
      this.autoReconnect = false;
      if (this.socket) this.socket.close();
      this.socket = null;
    }

    subscribe(topic, type, callback, options) {
      const throttleRate = options && options.throttleRate ? options.throttleRate : 80;
      this._subscriptions.set(topic, { topic, type, callback, throttleRate });
      if (this.connected) this._sendSubscribe(topic, type, throttleRate);
    }

    unsubscribe(topic) {
      this._subscriptions.delete(topic);
      this._send({ op: 'unsubscribe', topic });
    }

    callService(service, type, args) {
      const id = this._id('service');
      return new Promise((resolve, reject) => {
        if (!this.connected) {
          reject(new Error('ROS 未连接'));
          return;
        }
        this._pendingServices.set(id, { resolve, reject });
        this._send({
          op: 'call_service',
          id,
          service,
          type,
          args: args || {}
        });
      });
    }

    enable() {
      return this.callService(`/${this.namespace}/enable`, 'std_srvs/srv/Trigger', {});
    }

    disable() {
      return this.callService(`/${this.namespace}/disable`, 'std_srvs/srv/Trigger', {});
    }

    safeHome() {
      return this.callService(`/${this.namespace}/safe_home`, 'std_srvs/srv/Trigger', {});
    }

    setGripper(position, maxEffort) {
      return this.callService(`/${this.namespace}/gripper/set`, 'rebotarm_msgs/srv/SetGripper', {
        position,
        max_effort: maxEffort || 0
      });
    }

    moveToPose(pose, duration) {
      return this.sendActionGoal(`/${this.namespace}/move_to_pose`, 'rebotarm_msgs/action/MoveToPose', {
        target_pose: pose,
        duration: Number(duration) || 2
      });
    }

    solveMoveToPoseIK(pose) {
      return this.callService(`/${this.namespace}/move_to_pose_ik`, 'rebotarm_msgs/srv/MoveToPoseIK', {
        target_pose: pose
      });
    }

    followJointTrajectory(jointNames, points) {
      return this.sendActionGoal(`/${this.namespace}/follow_joint_trajectory`, 'control_msgs/action/FollowJointTrajectory', {
        trajectory: {
          header: { stamp: { sec: 0, nanosec: 0 }, frame_id: '' },
          joint_names: jointNames,
          points
        },
        goal_tolerance: [],
        path_tolerance: [],
        goal_time_tolerance: { sec: 0, nanosec: 0 }
      });
    }

    sendActionGoal(actionName, actionType, goal) {
      const uuid = this._uuid();
      return this.callService(`${actionName}/_action/send_goal`, `${actionType}_SendGoal`, {
        goal_id: { uuid },
        goal
      }).then((result) => ({ ...result, goal_id: uuid, action: actionName }));
    }

    getRosTopics() {
      return this.callService('/rosapi/topics', 'rosapi_msgs/srv/Topics', {});
    }

    getRosServices() {
      return this.callService('/rosapi/services', 'rosapi_msgs/srv/Services', {});
    }

    getLastMessageAt(topic) {
      return this._lastMessageAt.get(topic) || 0;
    }

    publishJointCommand(jointName, position, options) {
      const topic = `/${this.namespace}/joints/${jointName}/cmd`;
      const type = 'rebotarm_msgs/msg/JointMotorCmd';
      this.advertise(topic, type);
      this.publish(topic, {
        mode: options && typeof options.mode === 'number' ? options.mode : 1,
        use_pos: true,
        use_vel: false,
        use_kp: false,
        use_kd: false,
        use_tau: false,
        use_vlim: Boolean(options && typeof options.vlim === 'number'),
        pos: position,
        vel: 0,
        kp: 0,
        kd: 0,
        tau: 0,
        vlim: options && typeof options.vlim === 'number' ? options.vlim : 0,
        stamp: { sec: 0, nanosec: 0 }
      });
    }

    publishGripperCommand(position) {
      const topic = `/${this.namespace}/gripper/cmd`;
      const type = 'rebotarm_msgs/msg/JointMotorCmd';
      this.advertise(topic, type);
      this.publish(topic, {
        mode: 1,
        use_pos: true,
        use_vel: false,
        use_kp: false,
        use_kd: false,
        use_tau: false,
        use_vlim: false,
        pos: position,
        vel: 0,
        kp: 0,
        kd: 0,
        tau: 0,
        vlim: 0,
        stamp: { sec: 0, nanosec: 0 }
      });
    }

    advertise(topic, type) {
      if (this._advertisedTopics.has(topic)) return;
      this._advertisedTopics.add(topic);
      this._send({ op: 'advertise', topic, type });
    }

    publish(topic, msg) {
      this._send({ op: 'publish', topic, msg });
    }

    _resubscribe() {
      this._subscriptions.forEach((sub) => {
        this._sendSubscribe(sub.topic, sub.type, sub.throttleRate);
      });
    }

    _sendSubscribe(topic, type, throttleRate) {
      this._send({
        op: 'subscribe',
        id: this._id('sub'),
        topic,
        type,
        throttle_rate: throttleRate
      });
    }

    _handleMessage(event) {
      let data;
      try {
        data = JSON.parse(event.data);
      } catch (error) {
        this._emitStatus('error', '收到无法解析的 ROS 消息');
        return;
      }

      if (data.op === 'publish') {
        this._lastMessageAt.set(data.topic, Date.now());
        const sub = this._subscriptions.get(data.topic);
        if (sub) sub.callback(data.msg, data.topic);
        return;
      }

      if (data.op === 'service_response') {
        const pending = this._pendingServices.get(data.id);
        if (!pending) return;
        this._pendingServices.delete(data.id);
        if (data.result === false) {
          pending.reject(new Error(data.values && data.values.message ? data.values.message : 'ROS service failed'));
        } else {
          pending.resolve(data.values || {});
        }
      }
    }

    _send(payload) {
      if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return;
      this.socket.send(JSON.stringify(payload));
    }

    _rejectPendingServices(message) {
      this._pendingServices.forEach((pending) => pending.reject(new Error(message)));
      this._pendingServices.clear();
    }

    _id(prefix) {
      const id = `${prefix}:${this._nextId}`;
      this._nextId += 1;
      return id;
    }

    _uuid() {
      const values = new Uint8Array(16);
      if (window.crypto && typeof window.crypto.getRandomValues === 'function') {
        window.crypto.getRandomValues(values);
      } else {
        for (let i = 0; i < values.length; i += 1) {
          values[i] = Math.floor(Math.random() * 256);
        }
      }
      return Array.from(values);
    }

    _emitStatus(state, message) {
      this.dispatchEvent(new CustomEvent('status', { detail: { state, message } }));
    }
  }

  window.ReBotRosClient = ReBotRosClient;
})();
