(function () {
  const NS = 'rebotarm';
  const DEFAULT_URL = 'ws://192.168.60.128:9090';
  const OPEN_GRIPPER_M = 0.09;
  const CLOSE_GRIPPER_M = 0;
  const JOINT_NAMES = ['joint1', 'joint2', 'joint3', 'joint4', 'joint5', 'joint6'];
  const REQUIRED_TOPICS = {
    jointStates: `/${NS}/joint_states`,
    armStatus: `/${NS}/arm_status`,
    gripper: `/${NS}/gripper/state`
  };

  const els = {
    url: document.getElementById('ros-url'),
    connect: document.getElementById('ros-connect'),
    disconnect: document.getElementById('ros-disconnect'),
    mirror: document.getElementById('ros-mirror'),
    control: document.getElementById('ros-control-enable'),
    status: document.getElementById('ros-status'),
    message: document.getElementById('ros-message'),
    feedbackError: document.getElementById('ros-feedback-error'),
    enable: document.getElementById('ros-enable'),
    disable: document.getElementById('ros-disable'),
    safeHome: document.getElementById('ros-safe-home'),
    rosOpenGripper: document.getElementById('ros-open-gripper'),
    closeGripper: document.getElementById('ros-close-gripper'),
    openGripper: document.getElementById('open-gripper'),
    simCloseGripper: document.getElementById('close-gripper'),
    mode: document.getElementById('ros-mode'),
    modePill: document.getElementById('ros-mode-pill'),
    runDiagnostics: document.getElementById('ros-run-diagnostics'),
    clearLog: document.getElementById('ros-clear-log'),
    log: document.getElementById('ros-log'),
    diagBridge: document.getElementById('diag-bridge'),
    diagJointStates: document.getElementById('diag-joint-states'),
    diagArmStatus: document.getElementById('diag-arm-status'),
    diagGripper: document.getElementById('diag-gripper'),
    vlim: document.getElementById('ros-vlim'),
    trajectoryDuration: document.getElementById('ros-trajectory-duration'),
    requireConfirm: document.getElementById('ros-require-confirm'),
    sendTeachTrajectory: document.getElementById('ros-send-teach-trajectory'),
    sendCurrentTrajectory: document.getElementById('ros-send-current-trajectory'),
    poseX: document.getElementById('ros-pose-x'),
    poseY: document.getElementById('ros-pose-y'),
    poseZ: document.getElementById('ros-pose-z'),
    poseDuration: document.getElementById('ros-pose-duration'),
    checkIk: document.getElementById('ros-check-ik'),
    sendPose: document.getElementById('ros-send-pose'),
    stopPath: document.getElementById('stop-path')
  };

  if (!window.ReBotRosClient || !els.connect) return;

  const client = new window.ReBotRosClient({ namespace: NS, url: els.url ? els.url.value : DEFAULT_URL });
  window.reBotRos = client;

  const lastSent = new Map();
  const simTargetAngles = new Map();
  const mirrorHoldUntil = new Map();
  const COMMAND_INTERVAL_MS = 45;
  const MIRROR_HOLD_MS = 1800;
  let realArmed = false;
  let latestJointPositions = null;
  let latestGripperPosition = null;
  let listedTopics = new Set();
  let listedServices = new Set();
  let lowLevelPlayback = null;

  client.subscribe(REQUIRED_TOPICS.jointStates, 'sensor_msgs/msg/JointState', handleJointStates, { throttleRate: 80 });
  client.subscribe(REQUIRED_TOPICS.gripper, 'rebotarm_msgs/msg/JointMotorState', handleGripperState, { throttleRate: 80 });
  client.subscribe(REQUIRED_TOPICS.armStatus, 'rebotarm_msgs/msg/ArmStatus', handleArmStatus, { throttleRate: 200 });

  client.addEventListener('status', (event) => {
    const detail = event.detail || {};
    setStatus(detail.state, detail.message);
    if (detail.state !== 'connecting') {
      writeLog(detail.message || detail.state, detail.state === 'error' ? 'error' : detail.state === 'open' ? 'ok' : 'info');
    }
    updateDiagnostics();
    if (detail.state === 'open') window.setTimeout(runDiagnostics, 250);
  });

  els.connect.addEventListener('click', () => {
    client.autoReconnect = true;
    client.connect(els.url.value.trim() || DEFAULT_URL);
  });
  els.disconnect.addEventListener('click', () => {
    cancelLowLevelPlayback();
    client.disconnect();
  });
  els.enable.addEventListener('click', () => guardedCall(() => client.enable(), '已请求使能'));
  els.disable.addEventListener('click', () => {
    cancelLowLevelPlayback();
    guardedCall(() => client.disable(), '已请求失能', true);
  });
  els.safeHome.addEventListener('click', () => guardedCall(() => client.safeHome(), '已请求安全回零'));
  els.rosOpenGripper.addEventListener('click', () => sendGripper(OPEN_GRIPPER_M, { requireControl: isRealMode() }));
  els.closeGripper.addEventListener('click', () => sendGripper(CLOSE_GRIPPER_M, { requireControl: isRealMode() }));
  els.openGripper.addEventListener('click', () => maybeSendGripper(OPEN_GRIPPER_M));
  els.simCloseGripper.addEventListener('click', () => maybeSendGripper(CLOSE_GRIPPER_M));
  els.runDiagnostics.addEventListener('click', runDiagnostics);
  els.clearLog.addEventListener('click', () => { els.log.innerHTML = ''; });
  els.sendTeachTrajectory.addEventListener('click', sendTeachTrajectory);
  els.sendCurrentTrajectory.addEventListener('click', sendCurrentTrajectory);
  els.checkIk.addEventListener('click', checkIk);
  els.sendPose.addEventListener('click', sendPoseGoal);
  if (els.stopPath) {
    els.stopPath.addEventListener('click', () => {
      cancelLowLevelPlayback();
      writeLog('已请求停止低层回放', 'warn');
    });
  }

  els.mode.addEventListener('change', () => {
    cancelLowLevelPlayback();
    realArmed = false;
    els.control.checked = false;
    updateModeUi();
    writeLog(`运行模式已切换为 ${isRealMode() ? '真机' : '仿真'}`, 'warn');
  });

  els.control.addEventListener('change', () => {
    if (isRealMode() && els.control.checked) {
      realArmed = window.confirm('真机模式会驱动真实硬件，确认解锁控制？');
      els.control.checked = realArmed;
    } else {
      realArmed = false;
    }
    updateModeUi();
  });

  waitForSimApi((sim) => sim.onCommand((command) => forwardSimCommand(command)));

  setStatus('closed', 'ROS 未连接');
  updateModeUi();
  updateDiagnostics();
  window.setInterval(updateDiagnostics, 1000);

  function handleJointStates(msg) {
    if (!window.reBotSim || !Array.isArray(msg.name) || !Array.isArray(msg.position)) return;
    const next = {};
    msg.name.forEach((name, index) => {
      const simName = normalizeJointName(name);
      if (!simName || typeof msg.position[index] !== 'number') return;
      next[simName] = msg.position[index];
    });

    if (Object.keys(next).length) latestJointPositions = { ...(latestJointPositions || {}), ...next };
    updateFeedbackError(next);

    if (els.mirror.checked && Object.keys(next).length) {
      const mirrored = {};
      const now = performance.now();
      Object.entries(next).forEach(([name, value]) => {
        const holdUntil = mirrorHoldUntil.get(name) || 0;
        const target = simTargetAngles.get(name);
        const reachedTarget = typeof target === 'number' && Math.abs(target - value) < 0.025;
        if (reachedTarget || now > holdUntil) {
          mirrorHoldUntil.delete(name);
          mirrored[name] = value;
        }
      });
      if (Object.keys(mirrored).length) window.reBotSim.setAngles(mirrored, { source: 'ros' });
    }
    updateDiagnostics();
  }

  function handleGripperState(msg) {
    if (typeof msg.position === 'number') {
      latestGripperPosition = msg.position;
    }
    if (els.mirror.checked && window.reBotSim && typeof msg.position === 'number') {
      const holdUntil = mirrorHoldUntil.get('gripper') || 0;
      const target = simTargetAngles.get('gripper');
      const reachedTarget = typeof target === 'number' && Math.abs(target - msg.position) < 0.003;
      if (reachedTarget || performance.now() > holdUntil) {
        mirrorHoldUntil.delete('gripper');
        window.reBotSim.setGripperWidth(msg.position, { source: 'ros', animate: false });
      }
    }
    if (typeof msg.position === 'number' && simTargetAngles.has('gripper')) {
      const target = simTargetAngles.get('gripper');
      const err = Math.abs(target - msg.position);
      if (err < 0.003) {
        setMessage(`夹爪已到位：ROS反馈 ${Math.round(msg.position * 1000)} 毫米`);
      } else {
        setMessage(`夹爪运动中：指令 ${Math.round(target * 1000)} 毫米 / ROS反馈 ${Math.round(msg.position * 1000)} 毫米`);
      }
    }
    updateDiagnostics();
  }

  function handleArmStatus(msg) {
    const enabled = msg.enabled ? '已使能' : '已失能';
    const mode = msg.mode || 'unknown';
    const machine = msg.state_machine || 'unknown';
    const errors = Array.isArray(msg.error_codes) && msg.error_codes.length ? `，错误 ${msg.error_codes.join(', ')}` : '';
    setMessage(`${enabled}，模式 ${mode}，状态 ${machine}${errors}`);
    updateDiagnostics();
  }

  function forwardSimCommand(command) {
    if (command && command.type === 'joint-batch') {
      forwardJointBatch(command);
      return;
    }
    if (!command || command.type !== 'joint') return;
    simTargetAngles.set(command.name, command.value);
    mirrorHoldUntil.set(command.name, performance.now() + MIRROR_HOLD_MS);

    if (els.mirror.checked && !els.control.checked && command.source === 'slider') {
      els.mirror.checked = false;
      writeLog('已暂停 ROS 镜像，避免旧反馈把滑块拉回', 'warn');
    }

    if (!controlAllowed(false)) return;

    const now = performance.now();
    const last = lastSent.get(command.name) || 0;
    if (now - last < COMMAND_INTERVAL_MS) return;
    lastSent.set(command.name, now);

    if (command.name === 'gripper') {
      client.publishGripperCommand(command.value);
      writeLog(`夹爪指令 ${(command.value * 1000).toFixed(0)} 毫米`, 'info');
      return;
    }
    client.publishJointCommand(command.name, command.value, { vlim: getVlim() });
  }

  function forwardJointBatch(command) {
    const joints = command && command.joints && typeof command.joints === 'object' ? command.joints : {};
    const names = [...JOINT_NAMES, 'gripper'].filter((name) => typeof joints[name] === 'number' && Number.isFinite(joints[name]));
    if (!names.length) return;

    const holdUntil = performance.now() + MIRROR_HOLD_MS;
    names.forEach((name) => {
      simTargetAngles.set(name, joints[name]);
      mirrorHoldUntil.set(name, holdUntil);
    });

    if (!controlAllowed(false)) return;

    names.forEach((name) => {
      lastSent.set(name, 0);
      if (name === 'gripper') {
        client.publishGripperCommand(joints[name]);
      } else {
        client.publishJointCommand(name, joints[name], { vlim: getVlim() });
      }
    });
    writeLog(`${command.label || command.source || '批量目标'} -> ROS ${names.length} 轴`, 'ok');
  }

  async function sendTeachTrajectory() {
    if (!controlAllowed(true)) return;
    const waypoints = getTeachWaypoints();
    if (!waypoints.length) {
      setMessage('没有示教点，请先录制 TCP waypoint。');
      return;
    }
    const points = buildTrajectoryPoints(waypoints, getTrajectoryDuration());
    await sendTrajectory(points, `已下发 ${points.length} 个轨迹点`);
  }

  async function sendCurrentTrajectory() {
    if (!controlAllowed(true) || !window.reBotSim) return;
    const angles = window.reBotSim.getAngles();
    const points = [
      makeTrajectoryPoint(getCurrentRosPositions(), 0.05),
      makeTrajectoryPoint(JOINT_NAMES.map((name) => Number(angles[name] || 0)), getTrajectoryDuration())
    ];
    await sendTrajectory(points, '已下发当前姿态轨迹');
  }

  async function checkIk() {
    if (!client.connected) {
      setStatus('closed', 'ROS 未连接');
      return;
    }
    await guardedCall(() => client.solveMoveToPoseIK(readPose()), '已请求 IK 检查', true);
  }

  async function sendPoseGoal() {
    if (!controlAllowed(true)) return;
    await guardedCall(() => client.moveToPose(readPose(), Number(els.poseDuration.value) || 2), '已请求 MoveToPose 动作');
  }

  async function runDiagnostics() {
    updateDiagnostics();
    if (!client.connected) {
      writeLog('rosbridge 离线，请先连接', 'warn');
      return;
    }
    try {
      const topics = await client.getRosTopics();
      const services = await client.getRosServices();
      const topicList = topics.topics || [];
      const serviceList = services.services || [];
      listedTopics = new Set(topicList);
      listedServices = new Set(serviceList);
      writeLog(`rosapi: ${topicList.length} topics, ${serviceList.length} services`, 'ok');
      markDiag(els.diagJointStates, topicList.includes(REQUIRED_TOPICS.jointStates), '已发现');
      markDiag(els.diagArmStatus, topicList.includes(REQUIRED_TOPICS.armStatus), '已发现');
      markDiag(els.diagGripper, topicList.includes(REQUIRED_TOPICS.gripper), '已发现');
      if (!isRealMode() && !hasActionService(`/${NS}/follow_joint_trajectory`)) {
        writeLog('已检测到仿真驱动，轨迹按钮将使用低层回放', 'info');
      }
    } catch (error) {
      writeLog(`rosapi 不可用，改用实时话题时间判断（${error.message || error}）`, 'warn');
    }
  }

  function buildTrajectoryPoints(waypoints, totalDuration) {
    const firstT = waypoints[0].t || 0;
    const lastT = waypoints[waypoints.length - 1].t || firstT + 1;
    const span = Math.max(lastT - firstT, 1);
    const points = [makeTrajectoryPoint(getCurrentRosPositions(), 0.05)];
    waypoints.forEach((point, index) => {
      const ratio = waypoints.length === 1 ? 1 : Math.max(0, (point.t - firstT) / span);
      const seconds = Math.max(0.2, index === waypoints.length - 1 ? totalDuration : ratio * totalDuration);
      points.push(makeTrajectoryPoint(JOINT_NAMES.map((name) => Number(point.joints[name] || 0)), seconds));
    });
    return points;
  }

  async function sendTrajectory(points, optimisticMessage) {
    if (!points.length) return;
    if (shouldUseLowLevelTrajectory()) {
      setMessage(`${optimisticMessage}（仿真低层回放）`);
      writeLog(`${optimisticMessage}；低层回放`, 'info');
      await replayTrajectoryLowLevel(points);
      return;
    }
    if (!hasActionService(`/${NS}/follow_joint_trajectory`)) {
      writeLog('未发现 FollowJointTrajectory 动作，改用低层回放', 'warn');
      await replayTrajectoryLowLevel(points);
      return;
    }
    await guardedCall(() => client.followJointTrajectory(JOINT_NAMES, points), optimisticMessage);
  }

  async function replayTrajectoryLowLevel(points) {
    cancelLowLevelPlayback();
    const playback = { cancelled: false };
    lowLevelPlayback = playback;
    const started = performance.now();
    writeLog(`低层回放开始（${points.length} 个点）`, 'ok');
    for (const point of points) {
      if (playback.cancelled || !controlAllowed(false)) break;
      const targetMs = rosTimeToSeconds(point.time_from_start) * 1000;
      const waitMs = Math.max(0, targetMs - (performance.now() - started));
      if (waitMs > 0) await sleep(waitMs);
      JOINT_NAMES.forEach((name, index) => {
        const pos = Number(point.positions[index]);
        if (Number.isFinite(pos)) {
          simTargetAngles.set(name, pos);
          client.publishJointCommand(name, pos, { vlim: getVlim() });
        }
      });
    }
    if (lowLevelPlayback === playback) lowLevelPlayback = null;
    writeLog(playback.cancelled ? '低层回放已取消' : '低层回放完成', playback.cancelled ? 'warn' : 'ok');
  }

  function cancelLowLevelPlayback() {
    if (lowLevelPlayback) lowLevelPlayback.cancelled = true;
  }

  function shouldUseLowLevelTrajectory() {
    return !isRealMode();
  }

  function hasActionService(actionName) {
    return listedServices.has(`${actionName}/_action/send_goal`);
  }

  function makeTrajectoryPoint(positions, seconds) {
    return {
      positions,
      velocities: JOINT_NAMES.map(() => 0),
      accelerations: [],
      effort: [],
      time_from_start: secondsToRosTime(seconds)
    };
  }

  function getCurrentRosPositions() {
    const source = latestJointPositions || (window.reBotSim && window.reBotSim.getAngles ? window.reBotSim.getAngles() : {});
    return JOINT_NAMES.map((name) => Number(source[name] || 0));
  }

  function getTeachWaypoints() {
    if (!window.reBotSim || typeof window.reBotSim.getTeachingWaypoints !== 'function') return [];
    return window.reBotSim.getTeachingWaypoints().filter((point) => point && point.joints);
  }

  function readPose() {
    return {
      position: {
        x: Number(els.poseX.value) || 0,
        y: Number(els.poseY.value) || 0,
        z: Number(els.poseZ.value) || 0
      },
      orientation: { x: 0, y: 0, z: 0, w: 1 }
    };
  }

  function controlAllowed(interactive) {
    if (!client.connected) {
      if (interactive) setStatus('closed', 'ROS 未连接');
      return false;
    }
    if (!isRealMode()) return true;
    if (!els.control.checked) {
      if (interactive) setMessage('控制锁未打开，网页只更新仿真，不会控制 ROS。');
      return false;
    }
    if (isRealMode() && !realArmed) {
      if (interactive) setMessage('真机模式仍处于锁定状态。');
      return false;
    }
    if (interactive && isRealMode() && els.requireConfirm.checked) {
      return window.confirm('确认把这条指令发送到真实机械臂？');
    }
    return true;
  }

  async function guardedCall(call, optimisticMessage, allowWithoutControl) {
    if (!client.connected) {
      setStatus('closed', 'ROS 未连接');
      return null;
    }
    if (!allowWithoutControl && !controlAllowed(false)) {
      setMessage('控制锁未打开，网页只更新仿真，不会控制 ROS。');
      return null;
    }
    try {
      setMessage(optimisticMessage);
      writeLog(optimisticMessage, 'info');
      const result = await call();
      const message = formatServiceResult(result);
      setMessage(message);
      writeLog(message, result && result.accepted === false ? 'warn' : 'ok');
      return result;
    } catch (error) {
      const message = error && error.message ? error.message : 'ROS 调用失败';
      setStatus('error', message);
      writeLog(message, 'error');
      return null;
    }
  }

  function formatServiceResult(result) {
    if (!result) return 'ROS 调用完成';
    if (typeof result.accepted === 'boolean') return result.accepted ? '动作目标已接受' : '动作目标被拒绝';
    if (typeof result.message === 'string' && result.message) return result.message;
    if (typeof result.reached_position === 'number') return `夹爪到达 ${Math.round(result.reached_position * 1000)} 毫米`;
    if (Array.isArray(result.q_solution)) return `IK ${result.success ? '成功' : '失败'}：[${result.q_solution.map((v) => Number(v).toFixed(3)).join(', ')}]`;
    if (typeof result.success === 'boolean') return result.success ? 'ROS 调用成功' : 'ROS 调用失败';
    return 'ROS 调用完成';
  }

  function updateDiagnostics() {
    markDiag(els.diagBridge, client.connected, client.connected ? '在线' : '离线');
    markTopicDiag(els.diagJointStates, REQUIRED_TOPICS.jointStates);
    markTopicDiag(els.diagArmStatus, REQUIRED_TOPICS.armStatus);
    markTopicDiag(els.diagGripper, REQUIRED_TOPICS.gripper);
  }

  function markTopicDiag(el, topic) {
    const last = client.getLastMessageAt(topic);
    if (!client.connected) {
      markDiag(el, false, '--');
      return;
    }
    if (!last) {
      markDiag(el, null, listedTopics.has(topic) ? (topic === REQUIRED_TOPICS.armStatus ? '已发现' : '已发现 / 等待') : '等待');
      return;
    }
    const age = (Date.now() - last) / 1000;
    const liveLimit = topic === REQUIRED_TOPICS.armStatus ? 90 : 2.5;
    markDiag(el, age < liveLimit, `${age.toFixed(1)}s`);
  }

  function markDiag(el, ok, text) {
    if (!el) return;
    const box = el.closest('.diag-item');
    if (box) {
      box.classList.toggle('ok', ok === true);
      box.classList.toggle('warn', ok === null);
      box.classList.toggle('bad', ok === false);
    }
    el.textContent = text;
  }

  function normalizeJointName(name) {
    const text = String(name || '').toLowerCase();
    const match = text.match(/joint[_-]?([1-6])$/) || text.match(/j([1-6])$/);
    return match ? `joint${match[1]}` : null;
  }

  function updateFeedbackError(feedback) {
    if (!els.feedbackError || !window.reBotSim || !feedback || !Object.keys(feedback).length) return;
    const simAngles = typeof window.reBotSim.getAngles === 'function' ? window.reBotSim.getAngles() : {};
    let maxError = 0;
    let sumSq = 0;
    let count = 0;
    let worstJoint = '';

    Object.entries(feedback).forEach(([name, value]) => {
      const target = simTargetAngles.has(name) ? simTargetAngles.get(name) : simAngles[name];
      if (typeof target !== 'number') return;
      const error = Math.abs(target - value);
      if (error > maxError) {
        maxError = error;
        worstJoint = name;
      }
      sumSq += error * error;
      count += 1;
    });

    if (!count) return;
    const rms = Math.sqrt(sumSq / count);
    els.feedbackError.textContent = `最大 ${(maxError * 180 / Math.PI).toFixed(2)} 度 ${worstJoint || ''} / RMS ${(rms * 180 / Math.PI).toFixed(2)} 度`;
    els.feedbackError.style.color = maxError < 0.035 ? '#d7fff4' : (maxError < 0.12 ? '#ffe0b0' : '#ffd1c9');
  }

  function maybeSendGripper(position) {
    syncSimGripper(position);
    if (!client.connected) {
      setMessage('夹爪已更新到网页仿真；ROS 未连接。');
      return;
    }
    if (isRealMode() && !controlAllowed(false)) {
      setMessage('真机模式下夹爪需要先打开控制锁。');
      return;
    }
    publishGripper(position);
  }

  function sendGripper(position, options) {
    syncSimGripper(position);
    if (options && options.requireControl && !controlAllowed(true)) return;
    if (!client.connected) {
      setStatus('closed', 'ROS 未连接');
      return;
    }
    publishGripper(position);
  }

  function publishGripper(position) {
    client.publishGripperCommand(position);
    simTargetAngles.set('gripper', position);
    mirrorHoldUntil.set('gripper', performance.now() + 1200);
    const feedback = typeof latestGripperPosition === 'number' ? `，当前 ROS反馈 ${Math.round(latestGripperPosition * 1000)} 毫米` : '';
    setMessage(`夹爪指令已发布：${Math.round(position * 1000)} 毫米${feedback}`);
    writeLog(`夹爪指令 ${Math.round(position * 1000)} 毫米 -> /${NS}/gripper/cmd`, 'ok');
    window.setTimeout(() => {
      if (client.connected) client.publishGripperCommand(position);
    }, 120);
  }

  function syncSimGripper(position) {
    if (!window.reBotSim || typeof window.reBotSim.setGripperWidth !== 'function') return;
    window.reBotSim.setGripperWidth(position, { source: 'ui', animate: true });
  }

  function isRealMode() {
    return els.mode && els.mode.value === 'real';
  }

  function updateModeUi() {
    if (!els.modePill) return;
    els.modePill.textContent = isRealMode() ? (realArmed ? '真机已解锁' : '真机锁定') : '仿真';
    els.modePill.className = 'mini-pill';
    els.modePill.classList.add(isRealMode() ? (realArmed ? 'error' : 'warn') : 'online');
  }

  function getVlim() {
    return clamp(Number(els.vlim.value) || 1.2, 0.05, 3);
  }

  function getTrajectoryDuration() {
    return clamp(Number(els.trajectoryDuration.value) || 6, 1, 30);
  }

  function secondsToRosTime(seconds) {
    const sec = Math.floor(seconds);
    return { sec, nanosec: Math.round((seconds - sec) * 1e9) };
  }

  function rosTimeToSeconds(time) {
    return Number(time && time.sec ? time.sec : 0) + Number(time && time.nanosec ? time.nanosec : 0) * 1e-9;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function sleep(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  function waitForSimApi(callback) {
    if (window.reBotSim && typeof window.reBotSim.onCommand === 'function') {
      callback(window.reBotSim);
      return;
    }
    window.setTimeout(() => waitForSimApi(callback), 50);
  }

  function setStatus(state, message) {
    els.status.className = 'mini-pill';
    if (state === 'open') {
      els.status.classList.add('online');
      els.status.textContent = '在线';
    } else if (state === 'connecting') {
      els.status.classList.add('warn');
      els.status.textContent = '连接中';
    } else if (state === 'error') {
      els.status.classList.add('error');
      els.status.textContent = '错误';
    } else {
      els.status.textContent = '离线';
    }
    setMessage(message);
  }

  function setMessage(message) {
    if (els.message) els.message.textContent = message || '';
  }

  function writeLog(message, level) {
    if (!els.log || !message) return;
    const line = document.createElement('div');
    line.className = `ros-log-line ${level || 'info'}`;
    const now = new Date();
    line.innerHTML = `<time>${now.toLocaleTimeString()}</time><span></span>`;
    line.querySelector('span').textContent = String(message);
    els.log.prepend(line);
    while (els.log.children.length > 80) els.log.lastElementChild.remove();
  }
})();
