(function () {
  const DEG = Math.PI / 180;
  const RAD = 180 / Math.PI;
  const NOMINAL_REACH = 0.65;
  const GRIPPER_COMMAND_MAX = 0.09;
  const GRIPPER_VISUAL_MAX = 0.057;
  const GRIPPER_ANIMATION_MS = 520;
  const GRIPPER_MESH_VERSION = 'fixed-fasteners-v1';

  const jointDefs = [
    { name: 'joint1', label: 'J1 底座偏航', min: -2.8, max: 2.8, home: 0 },
    { name: 'joint2', label: 'J2 肩部', min: -3.14, max: 0, home: 0 },
    { name: 'joint3', label: 'J3 肘部', min: -3.14, max: 0, home: 0 },
    { name: 'joint4', label: 'J4 腕部俯仰', min: -1.87, max: 1.57, home: 0 },
    { name: 'joint5', label: 'J5 腕部偏航', min: -1.57, max: 1.57, home: 0 },
    { name: 'joint6', label: 'J6 工具旋转', min: -3.14, max: 3.14, home: 0 },
    { name: 'gripper', label: 'J7 夹爪', min: 0, max: GRIPPER_COMMAND_MAX, home: 0, unit: 'm' }
  ];

  const presets = {
    ready: { label: '就绪', angles: [0, 0, 0, 0, 0, 0, 0] },
    forward: { label: '前方工作', angles: [0, -25, -35, 28, 0, 0, 90] },
    left: { label: '左侧抓取', angles: [42, -25, -45, 32, 18, 0, 90] },
    right: { label: '右侧放置', angles: [-42, -25, -45, 32, -18, 0, 20] },
    inspect: { label: '检测', angles: [18, -36, -26, -16, 45, 90, 45] },
    fold: { label: '折叠', angles: [0, -88, -118, 78, 0, 0, 0] }
  };

  let scene;  let camera;
  let renderer;
  let controls;
  let robot;
  let robotFrame;
  let ghostRobot;
  let gripperGroup;
  let ghostGripperGroup;
  let envelopeGroup;
  let workspacePlanarReach = NOMINAL_REACH;
  let workspaceVerticalReach = NOMINAL_REACH;
  let targetGhost;
  let tcpMarker;
  let dragErrorLine;
  let animation = null;
  let currentAngles = {};
  let targetAngles = {};
  let moveStartAngles = {};
  let moveStart = 0;
  let moveDuration = 900;
  let gripperMotion = null;
  let dragMode = false;
  let draggingTcp = false;
  let dragPlane = null;
  let dragTarget = new THREE.Vector3();
  let dragLastTime = 0;
  let dragPointerId = null;
  let dragTargetClamped = false;
  let dragSettling = false;
  let dragSettleStart = 0;
  let dragSettleLastTime = 0;
  const DRAG_SETTLE_TIMEOUT_MS = 1400;
  const DRAG_SETTLE_TARGET_ERROR = 0.002;
  let teachingRecording = false;
  let teachingStart = 0;
  let teachingLastSample = 0;
  let teachingWaypoints = [];
  let teachingPlayback = null;
  const TEACH_SAMPLE_INTERVAL_MS = 90;
  const TEACH_MIN_TCP_STEP = 0.004;
  const commandListeners = new Set();
  const axisLabelSprites = [];

  const els = {
    host: document.getElementById('scene-host'),
    loading: document.getElementById('loading-mask'),
    loadingText: document.getElementById('loading-text'),
    status: document.getElementById('load-status'),
    tcp: document.getElementById('tcp-position'),
    reach: document.getElementById('reach-state'),
    dragMarker: document.getElementById('drag-marker'),
    dragHud: document.getElementById('drag-hud'),
    dragStatus: document.getElementById('drag-status'),
    teachRecord: document.getElementById('teach-record'),
    teachReplay: document.getElementById('teach-replay'),
    teachExport: document.getElementById('teach-export'),
    teachClear: document.getElementById('teach-clear'),
    teachStatus: document.getElementById('teach-status'),
    teachExportText: document.getElementById('teach-export-text'),
    joints: document.getElementById('joint-controls'),
    presets: document.getElementById('preset-buttons'),
    planTrajectory: document.getElementById('plan-trajectory'),
    toggleDrag: document.getElementById('toggle-drag')
  };

  jointDefs.forEach((joint) => {
    currentAngles[joint.name] = joint.home;
    targetAngles[joint.name] = joint.home;
  });

  init();

  function init() {
    buildControls();
    setupScene();
    setupEvents();
    updateTeachingStatus();
    loadRobot();
    animate();
  }

  function buildControls() {
    Object.entries(presets).forEach(([key, preset]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = preset.label;
      button.addEventListener('click', () => applyPreset(key, false, { source: 'preset' }));
      els.presets.appendChild(button);
    });

    jointDefs.forEach((joint) => {
      const wrap = document.createElement('div');
      wrap.className = 'joint-control';

      const head = document.createElement('div');
      head.className = 'joint-head';
      head.innerHTML = `<strong>${joint.label}</strong><span class="joint-value" id="${joint.name}-value">0.0 度</span>`;

      const range = document.createElement('input');
      range.type = 'range';
      range.id = joint.name;
      if (joint.unit === 'm') {
        range.min = (joint.min * 1000).toFixed(0);
        range.max = (joint.max * 1000).toFixed(0);
        range.step = '1';
        range.value = (joint.home * 1000).toFixed(0);
      } else {
        range.min = (joint.min * RAD).toFixed(1);
        range.max = (joint.max * RAD).toFixed(1);
        range.step = '0.5';
        range.value = (joint.home * RAD).toFixed(1);
      }
      range.addEventListener('input', () => {
        stopPath();
        const value = joint.unit === 'm' ? Number(range.value) / 1000 : Number(range.value) * DEG;
        setJoint(joint.name, value, true, { source: 'slider' });
        syncGhostToRobot();
      });

      wrap.appendChild(head);
      wrap.appendChild(range);
      els.joints.appendChild(wrap);
      updateJointLabel(joint.name);
    });
  }

  function setupScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111211);

    camera = new THREE.PerspectiveCamera(48, getAspect(), 0.01, 20);
    resetCamera();

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(els.host.clientWidth, els.host.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    els.host.appendChild(renderer.domElement);

    controls = createOrbit(camera, renderer.domElement, new THREE.Vector3(0.18, 0.2, 0));

    robotFrame = new THREE.Group();
    robotFrame.rotation.x = -Math.PI / 2;
    scene.add(robotFrame);

    setupLights();
    createWorkbench();
    createDirectionAxes();
    envelopeGroup = createEnvelope();
    scene.add(envelopeGroup);

    tcpMarker = new THREE.Mesh(
      new THREE.SphereGeometry(0.012, 24, 16),
      new THREE.MeshStandardMaterial({ color: 0x33d6b0, emissive: 0x0a4d3d, emissiveIntensity: 0.9 })
    );
    scene.add(tcpMarker);

    targetGhost = new THREE.Mesh(
      new THREE.SphereGeometry(0.018, 28, 18),
      new THREE.MeshBasicMaterial({ color: 0xf2a541, transparent: true, opacity: 0.85 })
    );
    targetGhost.visible = false;
    scene.add(targetGhost);

    dragErrorLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]),
      new THREE.LineBasicMaterial({ color: 0xff6b5f, transparent: true, opacity: 0.82 })
    );
    dragErrorLine.visible = false;
    scene.add(dragErrorLine);
  }

  function setupLights() {
    scene.add(new THREE.HemisphereLight(0xf6f1e8, 0x30352f, 0.9));

    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(1.4, 2.2, 1.2);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 0.1;
    key.shadow.camera.far = 6;
    key.shadow.camera.left = -1.4;
    key.shadow.camera.right = 1.4;
    key.shadow.camera.top = 1.4;
    key.shadow.camera.bottom = -1.4;
    scene.add(key);

    const side = new THREE.DirectionalLight(0x7fffe0, 0.35);
    side.position.set(-1, 0.6, -1.2);
    scene.add(side);
  }

  function createWorkbench() {
    const grid = new THREE.GridHelper(2.4, 48, 0x4d716a, 0x2c3a35);
    grid.position.y = 0;
    scene.add(grid);
  }

  function createDirectionAxes() {
    const origin = new THREE.Vector3(0, 0.006, 0);
    addArrow(origin, new THREE.Vector3(1, 0, 0), 0xef5a4d, 'ROS +X 前方');
    addArrow(origin, new THREE.Vector3(0, 0, -1), 0x77c96b, 'ROS +Y 左侧');
    addArrow(origin, new THREE.Vector3(0, 1, 0), 0x5fa8ff, 'ROS +Z 向上');
  }

  function addArrow(origin, dir, color, label) {
    const arrow = new THREE.ArrowHelper(dir, origin, 0.18, color, 0.035, 0.012);
    scene.add(arrow);

    const sprite = makeTextSprite(label, color);
    sprite.position.copy(origin).add(dir.clone().multiplyScalar(0.23));
    sprite.position.y += dir.y === 0 ? 0.018 : 0;
    sprite.userData.autoHideAt = performance.now() + 3000;
    sprite.userData.fadeDuration = 900;
    axisLabelSprites.push(sprite);
    scene.add(sprite);
  }

  function createEnvelope() {
    const group = new THREE.Group();
    const mainMat = new THREE.LineBasicMaterial({ color: 0x33d6b0, transparent: true, opacity: 0.32 });
    const guideMat = new THREE.LineBasicMaterial({ color: 0x33d6b0, transparent: true, opacity: 0.18 });
    const radius = workspacePlanarReach;
    const heightLimit = workspaceVerticalReach;

    [0, 0.25, 0.5, 0.75, 0.95].forEach((ratio) => {
      const height = heightLimit * ratio;
      const ringRadius = radius * Math.sqrt(Math.max(0, 1 - ratio * ratio));
      group.add(makeCircleLine(ringRadius, height, height === 0 ? mainMat : guideMat));
    });

    for (let i = 0; i < 12; i += 1) {
      group.add(makeVerticalArc(radius, heightLimit, (i / 12) * Math.PI * 2, i % 3 === 0 ? mainMat : guideMat));
    }
    return group;
  }

  function makeCircleLine(radius, y, mat) {
    const points = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(a) * radius, y, Math.sin(a) * radius));
    }
    return new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), mat);
  }

  function makeVerticalArc(radius, heightLimit, yaw, mat) {
    const points = [];
    for (let i = 0; i <= 72; i++) {
      const a = (i / 72) * Math.PI / 2;
      const r = Math.cos(a) * radius;
      const y = Math.sin(a) * heightLimit;
      points.push(new THREE.Vector3(Math.cos(yaw) * r, y, Math.sin(yaw) * r));
    }
    return new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), mat);
  }

  function createTaskSpace() {
    const group = new THREE.Group();
    addZone(group, 'Pick zone', 0.42, -0.23, 0x77c96b);
    addZone(group, 'Place zone', 0.42, 0.23, 0xf2a541);
    addZone(group, 'Inspect zone', 0.22, 0, 0x5fa8ff);

    const colors = [0xef5a4d, 0xf2a541, 0x5fa8ff];
    [[0.44, 0.16], [0.38, -0.18], [0.26, 0.02]].forEach((pos, index) => {
      const item = new THREE.Mesh(
        index === 1 ? new THREE.CylinderGeometry(0.025, 0.025, 0.055, 24) : new THREE.BoxGeometry(0.05, 0.05, 0.05),
        new THREE.MeshStandardMaterial({ color: colors[index], roughness: 0.55 })
      );
      item.position.set(pos[0], 0.025, -pos[1]);
      item.castShadow = true;
      item.receiveShadow = true;
      item.userData.clickTarget = true;
      item.userData.targetKind = 'object';
      item.userData.targetLabel = index === 0 ? '红色方块' : (index === 1 ? '圆柱' : '蓝色方块');
      group.add(item);
    });
    return group;
  }

  function addZone(group, label, rosX, rosY, color) {
    const zone = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.004, 0.18),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.18 })
    );
    zone.position.set(rosX, 0.001, -rosY);
    zone.userData.clickTarget = true;
    zone.userData.targetKind = 'zone';
    zone.userData.targetLabel = label;
    group.add(zone);

    const border = new THREE.LineSegments(
      new THREE.EdgesGeometry(zone.geometry),
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.7 })
    );
    border.position.copy(zone.position);
    group.add(border);

    const sprite = makeTextSprite(label, color);
    sprite.position.set(rosX, 0.018, -rosY);
    sprite.scale.set(0.07, 0.026, 1);
    group.add(sprite);
  }

  function loadRobot() {
    if (typeof URDFLoader === 'undefined') {
      failLoad('URDFLoader is not loaded.');
      return;
    }

    const manager = new THREE.LoadingManager();
    manager.onProgress = (url, loaded, total) => {
      els.loadingText.textContent = `Loading model ${Math.round((loaded / Math.max(total, 1)) * 100)}%`;
    };
    manager.onLoad = () => {
      if (!robot) return;
      finishRobotLoad();
    };

    const loader = new URDFLoader(manager);
    loader.packages = {
      rebotarm_bringup: `${window.location.origin}/api`
    };

    loader.load('/api/urdf', (loadedRobot) => {
      robot = loadedRobot;
      robotFrame.add(robot);
    }, undefined, (error) => {
      failLoad(`URDF load failed: ${error && error.message ? error.message : error}`);
    });
  }

  async function finishRobotLoad() {
    styleRobot(robot, false);
    try {
      gripperGroup = await attachGripperVisual(robot, false);
    } catch (error) {
      console.warn('Gripper STL load failed, continuing with arm model only:', error);
    }
    createGhostRobot();
    applyPreset('ready', true);
    estimateWorkspaceEnvelope();
    rebuildEnvelope();
    syncGhostToRobot();
    updateReadyState();
  }

  function estimateWorkspaceEnvelope() {
    if (!robot) return;

    const savedAngles = { ...currentAngles };
    let maxPlanar = NOMINAL_REACH;
    let maxVertical = NOMINAL_REACH;
    const movableJoints = jointDefs.filter((joint) => joint.name !== 'gripper');

    for (let i = 0; i < 960; i += 1) {
      const sample = { ...savedAngles };
      movableJoints.forEach((joint, index) => {
        const t = seededUnit(i + 1, index + 3);
        sample[joint.name] = joint.min + (joint.max - joint.min) * t;
      });
      applyRobotAngles(robot, sample);
      robot.updateMatrixWorld(true);

      const pos = getTcpPosition(robot);
      if (!pos) continue;
      maxPlanar = Math.max(maxPlanar, Math.sqrt(pos.x * pos.x + pos.z * pos.z));
      maxVertical = Math.max(maxVertical, Math.max(0, pos.y));
    }

    applyRobotAngles(robot, savedAngles);
    robot.updateMatrixWorld(true);
    workspacePlanarReach = clamp(Math.ceil(maxPlanar * 100) / 100, NOMINAL_REACH, 1.2);
    workspaceVerticalReach = clamp(Math.ceil(maxVertical * 100) / 100, NOMINAL_REACH, 1.2);
  }

  function seededUnit(a, b) {
    const x = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
    return x - Math.floor(x);
  }

  function rebuildEnvelope() {
    if (!scene) return;
    const wasVisible = envelopeGroup ? envelopeGroup.visible : true;
    if (envelopeGroup) scene.remove(envelopeGroup);
    envelopeGroup = createEnvelope();
    const toggle = document.getElementById('toggle-envelope');
    envelopeGroup.visible = toggle ? toggle.checked && wasVisible : wasVisible;
    scene.add(envelopeGroup);
  }

  function styleRobot(root, ghost) {
    const palette = [0xd8d5cc, 0xbec9c0, 0xe7e1d6, 0xaeb9b1, 0xd0c6b8, 0x9fb0a9, 0xf2a541, 0x33d6b0];
    let index = 0;
    root.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = !ghost;
      child.receiveShadow = !ghost;
      child.material = new THREE.MeshStandardMaterial({
        color: ghost ? 0x33d6b0 : palette[index % palette.length],
        roughness: ghost ? 0.28 : 0.62,
        metalness: ghost ? 0.05 : 0.18,
        transparent: ghost,
        opacity: ghost ? 0.22 : 1,
        side: THREE.DoubleSide
      });
      index += 1;
    });
  }

  function createGhostRobot() {
    if (!robot) return;
    ghostRobot = robot.clone(true);
    styleRobot(ghostRobot, true);
    ghostGripperGroup = ghostRobot.getObjectByName('sim_gripper');
    ghostRobot.visible = document.getElementById('toggle-ghost').checked;
    robotFrame.add(ghostRobot);
  }

  async function attachGripperVisual(root, ghost) {
    const endLink = root.getObjectByName('end_link') || root.getObjectByName('link6');
    if (!endLink || !THREE.STLLoader) return null;

    hideOriginalEndLinkMeshes(endLink);

    const group = new THREE.Group();
    group.name = 'sim_gripper';
    endLink.add(group);

    const loader = new THREE.STLLoader();
    const parts = [
      { name: 'gripper_base', file: 'gripper_base.stl', color: ghost ? 0x33d6b0 : 0xcfd8d1, moving: false },
      { name: 'left_finger', file: 'left_finger.stl', color: ghost ? 0x33d6b0 : 0x2fd0b0, moving: true },
      { name: 'right_finger', file: 'right_finger.stl', color: ghost ? 0x33d6b0 : 0x2fd0b0, moving: true }
    ];

    const meshes = await Promise.all(parts.map((part) => loadGripperMesh(loader, part, ghost)));
    meshes.forEach((mesh) => group.add(mesh));
    updateGripperVisual(group, currentAngles.gripper ?? 0);
    return group;
  }

  function hideOriginalEndLinkMeshes(endLink) {
    endLink.traverse((child) => {
      if (child !== endLink && child.isMesh) {
        child.visible = false;
      }
    });
  }

  function loadGripperMesh(loader, part, ghost) {
    return new Promise((resolve, reject) => {
      loader.load(`/api/gripper_meshes/${part.file}?v=${GRIPPER_MESH_VERSION}`, (geometry) => {
        geometry.computeVertexNormals();
        const material = new THREE.MeshStandardMaterial({
          color: part.color,
          roughness: part.moving ? 0.42 : 0.62,
          metalness: part.moving ? 0.18 : 0.25,
          transparent: ghost,
          opacity: ghost ? 0.22 : 1,
          side: THREE.DoubleSide
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = part.name;
        mesh.castShadow = !ghost;
        mesh.receiveShadow = !ghost;
        mesh.userData.isMovingFinger = part.moving;
        resolve(mesh);
      }, undefined, reject);
    });
  }

  function updateGripperVisual(group, widthM) {
    if (!group) return;
    const commandWidth = clamp(widthM, 0, GRIPPER_COMMAND_MAX);
    const visualWidth = (commandWidth / GRIPPER_COMMAND_MAX) * GRIPPER_VISUAL_MAX;
    const half = visualWidth / 2;
    const left = group.getObjectByName('left_finger');
    const right = group.getObjectByName('right_finger');
    if (left) left.position.y = half;
    if (right) right.position.y = -half;
  }

  function updateReadyState() {
    els.status.classList.add('ready');
    els.status.lastChild.textContent = ' Ready';
    els.loading.classList.add('hidden');
  }

  function failLoad(message) {
    els.status.lastChild.textContent = ' Load failed';
    els.loadingText.textContent = message;
  }

  function setupEvents() {
    window.addEventListener('resize', resize);
    document.getElementById('reset-camera').addEventListener('click', resetCamera);
    document.getElementById('play-path').addEventListener('click', playPath);
    document.getElementById('stop-path').addEventListener('click', () => {
      stopPath();
      teachingPlayback = null;
      updateTeachingStatus();
    });
    if (els.planTrajectory) els.planTrajectory.addEventListener('click', generateTrajectory);
    if (els.toggleDrag) els.toggleDrag.addEventListener('click', toggleDragMode);
    if (els.teachRecord) els.teachRecord.addEventListener('click', toggleTeachingRecord);
    if (els.teachReplay) els.teachReplay.addEventListener('click', replayTeaching);
    if (els.teachExport) els.teachExport.addEventListener('click', exportTeachingWaypoints);
    if (els.teachClear) els.teachClear.addEventListener('click', clearTeaching);
    if (els.dragMarker) {
      els.dragMarker.addEventListener('pointerdown', startTcpDrag);
    }
    window.addEventListener('pointermove', moveTcpDrag);
    window.addEventListener('pointerup', endTcpDrag);
    window.addEventListener('pointercancel', endTcpDrag);
    document.getElementById('open-gripper').addEventListener('click', () => setGripperWidth(GRIPPER_COMMAND_MAX));
    document.getElementById('close-gripper').addEventListener('click', () => setGripperWidth(0));

    document.getElementById('toggle-envelope').addEventListener('change', (event) => {
      envelopeGroup.visible = event.target.checked;
    });
    document.getElementById('toggle-ghost').addEventListener('change', (event) => {
      if (ghostRobot) ghostRobot.visible = event.target.checked;
      if (targetGhost) targetGhost.visible = (dragMode || event.target.checked) && targetGhost.userData.active;
    });
  }

  function applyPreset(key, immediate) {
    const preset = presets[key];
    if (!preset) return;
    const next = {};
    jointDefs.forEach((joint, index) => {
      const raw = preset.angles[index] || 0;
      next[joint.name] = clamp(joint.unit === 'm' ? raw / 1000 : raw * DEG, joint.min, joint.max);
    });
    moveToAngles(next, immediate ? 1 : 850, {
      source: immediate ? 'init' : 'preset',
      label: preset.label,
      emitBatch: !immediate
    });
  }

  function setJoint(name, rad, fromUser, options) {
    const def = jointDefs.find((item) => item.name === name);
    if (!def) return;
    const value = clamp(rad, def.min, def.max);
    currentAngles[name] = value;

    if (name === 'gripper') {
      updateGripperVisual(gripperGroup, value);
      updateGripperVisual(ghostGripperGroup, value);
    }

    const joint = getJoint(robot, name);
    if (joint) {
      if (typeof joint.setJointValue === 'function') {
        joint.setJointValue(value);
      } else if (typeof joint.setAngle === 'function') {
        joint.setAngle(value);
      }
    }
    if (name === 'gripper') {
      const leftFinger = getJoint(robot, 'finger_left');
      const rightFinger = getJoint(robot, 'finger_right');
      const fingerTravel = (value / GRIPPER_COMMAND_MAX) * GRIPPER_VISUAL_MAX * 0.5;
      if (leftFinger) {
        if (typeof leftFinger.setJointValue === 'function') {
          leftFinger.setJointValue(fingerTravel);
        } else if (typeof leftFinger.setAngle === 'function') {
          leftFinger.setAngle(fingerTravel);
        }
      }
      if (rightFinger) {
        if (typeof rightFinger.setJointValue === 'function') {
          rightFinger.setJointValue(-fingerTravel);
        } else if (typeof rightFinger.setAngle === 'function') {
          rightFinger.setAngle(-fingerTravel);
        }
      }
    }

    if (!fromUser) {
      const slider = document.getElementById(name);
      if (slider) slider.value = def.unit === 'm' ? (value * 1000).toFixed(0) : (value * RAD).toFixed(1);
    }
    updateJointLabel(name);

    const source = options && options.source ? options.source : (fromUser ? 'user' : 'sim');
    if (source !== 'ros' && !(options && options.emit === false)) {
      emitCommand({ type: 'joint', name, value, source, stamp: performance.now() });
    }
  }

  function setGhostJoint(name, rad) {
    if (name === 'gripper') {
      const leftFinger = getJoint(ghostRobot, 'finger_left');
      const rightFinger = getJoint(ghostRobot, 'finger_right');
      const fingerTravel = (rad / GRIPPER_COMMAND_MAX) * GRIPPER_VISUAL_MAX * 0.5;
      if (leftFinger) {
        if (typeof leftFinger.setJointValue === 'function') {
          leftFinger.setJointValue(fingerTravel);
        } else if (typeof leftFinger.setAngle === 'function') {
          leftFinger.setAngle(fingerTravel);
        }
      }
      if (rightFinger) {
        if (typeof rightFinger.setJointValue === 'function') {
          rightFinger.setJointValue(-fingerTravel);
        } else if (typeof rightFinger.setAngle === 'function') {
          rightFinger.setAngle(-fingerTravel);
        }
      }
      updateGripperVisual(ghostGripperGroup, rad);
      return;
    }
    const joint = getJoint(ghostRobot, name);
    if (!joint) return;
    if (typeof joint.setJointValue === 'function') {
      joint.setJointValue(rad);
    } else if (typeof joint.setAngle === 'function') {
      joint.setAngle(rad);
    }
  }

  function getJoint(root, name) {
    if (!root) return null;
    if (root.joints && root.joints[name]) return root.joints[name];
    return root.getObjectByName(name);
  }

  function moveToAngles(nextAngles, duration, options) {
    teachingPlayback = null;
    moveStartAngles = { ...currentAngles };
    targetAngles = { ...nextAngles };
    moveStart = performance.now();
    moveDuration = Math.max(duration || 850, 1);
    updateGhostTarget(nextAngles);
    if (options && options.emitBatch) {
      emitJointBatch(nextAngles, options.source || 'trajectory-target', options.label || '');
    }
  }

  function updateMotion(now) {
    if (!moveStart) return;
    const t = clamp((now - moveStart) / moveDuration, 0, 1);
    const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    jointDefs.forEach((joint) => {
      const start = moveStartAngles[joint.name] ?? currentAngles[joint.name];
      const end = targetAngles[joint.name] ?? start;
      setJoint(joint.name, start + (end - start) * eased, false, { source: 'trajectory', emit: false });
    });
    if (t >= 1) moveStart = 0;
  }

  function updateGhostTarget(angles) {
    if (!ghostRobot) return;
    jointDefs.forEach((joint) => setGhostJoint(joint.name, angles[joint.name] ?? 0));
    ghostRobot.updateMatrixWorld(true);

    const pos = getTcpPosition(ghostRobot);
    if (pos) {
      targetGhost.position.copy(pos);
      targetGhost.userData.active = true;
      targetGhost.visible = document.getElementById('toggle-ghost').checked;
    }
  }

  function syncGhostToRobot() {
    if (!ghostRobot) return;
    jointDefs.forEach((joint) => setGhostJoint(joint.name, currentAngles[joint.name] ?? 0));
    ghostRobot.updateMatrixWorld(true);
  }

  function generateTrajectory() {
    if (!robot) return;
    stopPath();
    draggingTcp = false;
    dragSettling = false;
    const destination = { ...currentAngles };
    const readyPreset = presets.ready;
    const readyAngles = {};

    jointDefs.forEach((joint, index) => {
      const raw = readyPreset.angles[index] || 0;
      readyAngles[joint.name] = clamp(joint.unit === 'm' ? raw / 1000 : raw * DEG, joint.min, joint.max);
      setJoint(joint.name, readyAngles[joint.name], false, { source: 'ros' });
    });

    syncGhostToRobot();
    updateGhostTarget(destination);
    moveToAngles(destination, 1200, {
      source: 'plan-current',
      label: '规划到当前姿态',
      emitBatch: true
    });
    setDragStatus('已生成：Ready -> 当前姿态');
  }

  function toggleDragMode() {
    dragMode = !dragMode;
    draggingTcp = false;
    dragSettling = false;
    dragLastTime = 0;

    if (els.toggleDrag) {
      els.toggleDrag.textContent = dragMode ? '退出 TCP 拖拽' : '启用 TCP 拖拽';
      els.toggleDrag.classList.toggle('active', dragMode);
    }
    if (els.dragMarker) {
      els.dragMarker.classList.toggle('active', dragMode);
      els.dragMarker.classList.remove('dragging');
      if (!dragMode) els.dragMarker.style.display = 'none';
    }
    if (els.dragHud) {
      els.dragHud.classList.toggle('active', dragMode);
    }

    const pos = getTcpPosition(robot);
    if (pos) {
      dragTarget.copy(pos);
      showTargetGhost(pos);
    }
    updateDragErrorLine();
    setDragStatus(dragMode ? '拖动绿色 TCP 标记' : '未启用');
    updateDragMarker();
  }

  function startTcpDrag(event) {
    if (!dragMode || !robot) return;
    event.preventDefault();
    event.stopPropagation();
    draggingTcp = true;
    dragSettling = false;
    dragTargetClamped = false;
    stopPath();
    moveStart = 0;
    dragPointerId = event.pointerId;
    dragLastTime = performance.now();
    dragPlane = createDragPlane();
    recordTeachingWaypoint(true);
    if (els.dragMarker) {
      els.dragMarker.classList.add('dragging');
      els.dragMarker.setPointerCapture(event.pointerId);
    }
    moveTcpDrag(event);
  }

  function moveTcpDrag(event) {
    if (!draggingTcp || !dragPlane || !robot) return;
    dragSettling = false;
    const hit = screenToDragPlane(event.clientX, event.clientY, dragPlane);
    if (!hit) return;

    const boundedTarget = clampToWorkspaceEnvelope(hit);
    dragTarget.copy(boundedTarget.point);
    dragTargetClamped = boundedTarget.clamped;
    showTargetGhost(dragTarget, dragTargetClamped);

    const now = performance.now();
    const dt = Math.min(0.05, Math.max(0.012, (now - dragLastTime) / 1000 || 0.016));
    dragLastTime = now;

    let result = null;
    const substeps = Math.max(1, Math.ceil(dt / 0.016));
    for (let i = 0; i < substeps; i += 1) {
      result = IKSolver.servoStep(dragTarget, dt / substeps);
    }

    syncGhostToRobot();
    recordTeachingWaypoint(false);
    updateDragMarker();
    updateDragErrorLine();
    if (result) {
      setDragStatus(`${dragTargetClamped ? '边界吸附 · ' : ''}误差 ${(result.error * 1000).toFixed(1)}mm`);
    }
  }

  function endTcpDrag(event) {
    if (!draggingTcp) return;
    draggingTcp = false;
    dragPlane = null;
    dragPointerId = null;
    const releasedTcp = getTcpPosition(robot);
    if (releasedTcp && releasedTcp.distanceTo(dragTarget) > DRAG_SETTLE_TARGET_ERROR) {
      dragSettling = true;
      dragSettleStart = performance.now();
      dragSettleLastTime = dragSettleStart;
      setDragStatus(`收敛中 ${(releasedTcp.distanceTo(dragTarget) * 1000).toFixed(1)}mm`);
    }
    if (els.dragMarker) {
      els.dragMarker.classList.remove('dragging');
      if (event && els.dragMarker.hasPointerCapture(event.pointerId)) {
        els.dragMarker.releasePointerCapture(event.pointerId);
      }
    }
    recordTeachingWaypoint(true);
    if (dragSettling) return;
    dragTargetClamped = false;
    const tcp = getTcpPosition(robot);
    if (tcp) {
      setDragStatus(`完成 ${(tcp.distanceTo(dragTarget) * 1000).toFixed(1)}mm`);
    }
  }

  function updateDragMarker() {
    if (!dragMode || !els.dragMarker || !camera || !robot) return;
    const pos = (draggingTcp || dragSettling) ? dragTarget : getTcpPosition(robot);
    if (!pos) return;

    const hostRect = els.host.getBoundingClientRect();
    const viewportRect = document.getElementById('viewport').getBoundingClientRect();
    const projected = pos.clone().project(camera);
    const x = hostRect.left - viewportRect.left + ((projected.x + 1) / 2) * hostRect.width;
    const y = hostRect.top - viewportRect.top + ((1 - projected.y) / 2) * hostRect.height;

    els.dragMarker.style.left = `${x}px`;
    els.dragMarker.style.top = `${y}px`;
    els.dragMarker.style.display = projected.z < 1 ? 'block' : 'none';
  }

  function updateDragSettling(now) {
    if (!dragMode || !dragSettling || draggingTcp || !robot) return;

    const dt = Math.min(0.05, Math.max(0.012, (now - dragSettleLastTime) / 1000 || 0.016));
    dragSettleLastTime = now;

    let result = null;
    const substeps = Math.max(1, Math.ceil(dt / 0.016));
    for (let i = 0; i < substeps; i += 1) {
      result = IKSolver.servoStep(dragTarget, dt / substeps, { source: 'drag-settle' });
    }

    syncGhostToRobot();
    recordTeachingWaypoint(false);
    showTargetGhost(dragTarget, dragTargetClamped);
    updateDragErrorLine();

    const elapsed = now - dragSettleStart;
    const fallbackTcp = result ? null : getTcpPosition(robot);
    const error = result ? result.error : (fallbackTcp ? fallbackTcp.distanceTo(dragTarget) : 0);
    if ((result && result.reached) || error <= DRAG_SETTLE_TARGET_ERROR) {
      dragSettling = false;
      dragTargetClamped = false;
      updateDragErrorLine();
      setDragStatus(`完成 ${(error * 1000).toFixed(1)}mm`);
    } else if (elapsed >= DRAG_SETTLE_TIMEOUT_MS) {
      dragSettling = false;
      dragTargetClamped = false;
      updateDragErrorLine();
      setDragStatus(`已尽量收敛 ${(error * 1000).toFixed(1)}mm`);
    } else {
      setDragStatus(`收敛中 ${(error * 1000).toFixed(1)}mm`);
    }
  }

  function createDragPlane() {
    const tcp = getTcpPosition(robot) || new THREE.Vector3();
    const normal = new THREE.Vector3();
    camera.getWorldDirection(normal);
    return new THREE.Plane().setFromNormalAndCoplanarPoint(normal, tcp);
  }

  function screenToDragPlane(clientX, clientY, plane) {
    const rect = els.host.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const hit = new THREE.Vector3();
    return raycaster.ray.intersectPlane(plane, hit) ? hit : null;
  }

  function clampToWorkspaceEnvelope(pos) {
    const point = pos.clone();
    let clamped = false;
    const radius = Math.max(workspacePlanarReach, 0.05);
    const heightLimit = Math.max(workspaceVerticalReach, 0.05);

    if (point.y < 0) {
      point.y = 0;
      clamped = true;
    } else if (point.y > heightLimit) {
      point.y = heightLimit;
      clamped = true;
    }

    const verticalRatio = clamp(point.y / heightLimit, 0, 1);
    const planarLimit = Math.max(0.03, radius * Math.sqrt(Math.max(0, 1 - verticalRatio * verticalRatio)));
    const planar = Math.sqrt(point.x * point.x + point.z * point.z);
    if (planar > planarLimit) {
      const scale = planarLimit / planar;
      point.x *= scale;
      point.z *= scale;
      clamped = true;
    }

    return { point, clamped };
  }

  function updateDragErrorLine() {
    if (!dragErrorLine || !robot) return;
    const active = dragMode && (draggingTcp || dragSettling || dragTargetClamped);
    const tcp = active ? getTcpPosition(robot) : null;
    if (!active || !tcp) {
      dragErrorLine.visible = false;
      return;
    }

    const error = tcp.distanceTo(dragTarget);
    if (error < 0.001) {
      dragErrorLine.visible = false;
      return;
    }

    dragErrorLine.geometry.setFromPoints([tcp, dragTarget]);
    dragErrorLine.material.opacity = clamp(error / 0.08, 0.28, 0.9);
    dragErrorLine.visible = true;
  }

  function showTargetGhost(pos, clamped) {
    if (!targetGhost || !pos) return;
    targetGhost.position.copy(pos);
    targetGhost.userData.active = true;
    targetGhost.userData.clamped = !!clamped;
    if (targetGhost.material && targetGhost.material.color) {
      targetGhost.material.color.set(clamped ? 0xff6b5f : 0xf2a541);
      targetGhost.material.opacity = clamped ? 0.95 : 0.85;
    }
    const ghostToggle = document.getElementById('toggle-ghost');
    targetGhost.visible = !!(dragMode || (ghostToggle && ghostToggle.checked));
  }

  function setDragStatus(text) {
    if (els.dragStatus) els.dragStatus.textContent = text;
  }

  function toggleTeachingRecord() {
    if (teachingRecording) {
      teachingRecording = false;
      recordTeachingWaypoint(true);
    } else {
      teachingWaypoints = [];
      teachingStart = performance.now();
      teachingLastSample = 0;
      teachingPlayback = null;
      teachingRecording = true;
      if (!dragMode) toggleDragMode();
      recordTeachingWaypoint(true);
      if (els.teachExportText) els.teachExportText.value = '';
    }
    updateTeachingStatus();
  }

  function recordTeachingWaypoint(force) {
    if (!teachingRecording || !robot) return;
    const now = performance.now();
    if (!force && now - teachingLastSample < TEACH_SAMPLE_INTERVAL_MS) return;

    const tcp = getTcpPosition(robot);
    if (!tcp) return;
    const last = teachingWaypoints[teachingWaypoints.length - 1];
    if (!force && last && last.tcp && new THREE.Vector3(last.tcp.x, last.tcp.y, last.tcp.z).distanceTo(tcp) < TEACH_MIN_TCP_STEP) {
      return;
    }

    teachingLastSample = now;
    const ros = threeToRos(tcp);
    teachingWaypoints.push({
      t: Math.max(0, now - teachingStart),
      joints: { ...currentAngles },
      tcp: { x: tcp.x, y: tcp.y, z: tcp.z },
      tcp_ros: { x: ros.x, y: ros.y, z: ros.z }
    });
    updateTeachingStatus();
  }

  function replayTeaching() {
    if (!teachingWaypoints.length || !robot) {
      updateTeachingStatus('没有可回放的 waypoint');
      return;
    }
    teachingRecording = false;
    stopPath();
    moveStart = 0;
    teachingPlayback = {
      points: teachingWaypoints.map((point) => ({ ...point, joints: { ...point.joints } })),
      index: 0,
      segmentStart: performance.now(),
      segmentDuration: 260,
      startAngles: { ...currentAngles }
    };
    updateTeachingStatus('正在回放示教轨迹');
  }

  function updateTeachingPlayback(now) {
    if (!teachingPlayback) return;
    const point = teachingPlayback.points[teachingPlayback.index];
    if (!point) {
      teachingPlayback = null;
      updateTeachingStatus('回放完成');
      return;
    }

    const t = clamp((now - teachingPlayback.segmentStart) / teachingPlayback.segmentDuration, 0, 1);
    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    jointDefs.forEach((joint) => {
      const start = teachingPlayback.startAngles[joint.name] ?? currentAngles[joint.name] ?? 0;
      const end = point.joints[joint.name] ?? start;
      setJoint(joint.name, start + (end - start) * eased, false, { source: 'teach-replay' });
    });

    if (t < 1) return;

    teachingPlayback.index += 1;
    if (teachingPlayback.index >= teachingPlayback.points.length) {
      teachingPlayback = null;
      syncGhostToRobot();
      updateTeachingStatus('回放完成');
      return;
    }

    const prev = teachingPlayback.points[teachingPlayback.index - 1];
    const next = teachingPlayback.points[teachingPlayback.index];
    teachingPlayback.startAngles = { ...currentAngles };
    teachingPlayback.segmentStart = now;
    teachingPlayback.segmentDuration = clamp(next.t - prev.t, 80, 900);
  }

  function exportTeachingWaypoints() {
    if (!teachingWaypoints.length) {
      updateTeachingStatus('没有可导出的 waypoint');
      return;
    }
    const jointNames = jointDefs.map((joint) => joint.name);
    const payload = {
      format: 'rebotarm_ros_waypoints_v1',
      frame_id: 'base_link',
      joint_names: jointNames,
      count: teachingWaypoints.length,
      waypoints: teachingWaypoints.map((point) => ({
        time_from_start: {
          sec: Math.floor(point.t / 1000),
          nanosec: Math.round((point.t % 1000) * 1e6)
        },
        positions: jointNames.map((name) => point.joints[name] ?? 0),
        tcp_ros: point.tcp_ros
      }))
    };
    const text = JSON.stringify(payload, null, 2);
    if (els.teachExportText) {
      els.teachExportText.value = text;
      els.teachExportText.focus();
      els.teachExportText.select();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    updateTeachingStatus(`已导出 ${teachingWaypoints.length} 个 waypoint`);
  }

  function clearTeaching() {
    teachingRecording = false;
    teachingPlayback = null;
    teachingWaypoints = [];
    if (els.teachExportText) els.teachExportText.value = '';
    updateTeachingStatus();
  }

  function updateTeachingStatus(message) {
    if (els.teachRecord) {
      els.teachRecord.textContent = teachingRecording ? '停止录制' : '开始录制';
      els.teachRecord.classList.toggle('active', teachingRecording);
    }
    if (!els.teachStatus) return;
    if (message) {
      els.teachStatus.textContent = message;
    } else if (teachingRecording) {
      els.teachStatus.textContent = `录制中：${teachingWaypoints.length} 个 waypoint`;
    } else if (teachingPlayback) {
      els.teachStatus.textContent = '正在回放示教轨迹';
    } else if (teachingWaypoints.length) {
      const duration = teachingWaypoints[teachingWaypoints.length - 1].t / 1000;
      els.teachStatus.textContent = `已录制 ${teachingWaypoints.length} 个 waypoint，${duration.toFixed(1)} 秒`;
    } else {
      els.teachStatus.textContent = '未录制';
    }
  }

  function planTcpMoveTo(target, label) {
    stopPath();
    moveStart = 0;
    showTargetGhost(target);

    const start = { ...currentAngles };
    const solved = solveIKTarget(target, 240, 900);
    applyRobotAngles(robot, start);
    Object.entries(start).forEach(([name, value]) => {
      setJoint(name, value, false, { source: 'ros' });
    });

    if (!solved || !solved.angles) {
      setDragStatus(`目标不可达：${label || '点击点'}`);
      return;
    }

    moveToAngles({ ...currentAngles, ...solved.angles }, 900);
    setDragStatus(`${label || '点击点'} -> TCP 上方 ${(solved.error * 1000).toFixed(1)}mm`);
  }

  function solveIKTarget(target, maxIter, timeoutMs) {
    const started = performance.now();
    let result = null;

    for (let i = 0; i < maxIter; i += 1) {
      result = IKSolver.servoStep(target, 0.016, { source: 'solver' });
      if (result && result.reached) break;
      if (performance.now() - started > timeoutMs) break;
    }

    return {
      angles: { ...currentAngles },
      error: result ? result.error : Infinity,
      reached: result ? result.reached : false
    };
  }

  function applyRobotAngles(root, angles) {
    if (!root) return;
    IKSolver.jointNames.forEach((name) => {
      const joint = getJoint(root, name);
      if (!joint) return;
      const value = angles[name] ?? 0;
      if (typeof joint.setJointValue === 'function') {
        joint.setJointValue(value);
      } else if (typeof joint.setAngle === 'function') {
        joint.setAngle(value);
      }
    });
    root.updateMatrixWorld(true);
  }

  const IKSolver = {
    jointNames: jointDefs.filter((joint) => joint.name !== 'gripper').map((joint) => joint.name),
    gain: 12,
    damping: 0.035,
    maxJointSpeed: 2.8,

    servoStep(target, dt, options) {
      if (!target || !robot || dt <= 0) return null;
      const current = getTcpPosition(robot);
      if (!current) return null;
      const error = new THREE.Vector3().subVectors(target, current);
      const errorNorm = error.length();
      if (errorNorm < 0.0015) return { error: errorNorm, reached: true };

      const stepError = error.multiplyScalar(Math.min(0.65, Math.max(0.08, this.gain * dt)));
      const jacobian = this.computeJacobian(currentAngles);
      const delta = this.solveDampedLeastSquares(jacobian, stepError);
      if (!delta) return { error: errorNorm, reached: false };

      this.jointNames.forEach((name, index) => {
        const def = jointDefs.find((joint) => joint.name === name);
        const limitedDelta = clamp(delta[index] || 0, -this.maxJointSpeed * dt, this.maxJointSpeed * dt);
        setJoint(name, clamp((currentAngles[name] || 0) + limitedDelta, def.min, def.max), false, { source: options && options.source ? options.source : 'drag' });
      });

      robot.updateMatrixWorld(true);
      const after = getTcpPosition(robot);
      const afterError = after ? after.distanceTo(target) : errorNorm;
      return { error: afterError, reached: afterError < 0.0015 };
    },

    computeJacobian(baseAngles) {
      const eps = 0.004;
      const saved = { ...baseAngles };
      const rows = [[], [], []];

      this.jointNames.forEach((name, index) => {
        const plus = { ...saved, [name]: (saved[name] || 0) + eps };
        const minus = { ...saved, [name]: (saved[name] || 0) - eps };

        applyRobotAngles(robot, plus);
        const plusPos = getTcpPosition(robot);
        applyRobotAngles(robot, minus);
        const minusPos = getTcpPosition(robot);

        rows[0][index] = plusPos && minusPos ? (plusPos.x - minusPos.x) / (2 * eps) : 0;
        rows[1][index] = plusPos && minusPos ? (plusPos.y - minusPos.y) / (2 * eps) : 0;
        rows[2][index] = plusPos && minusPos ? (plusPos.z - minusPos.z) / (2 * eps) : 0;
      });

      applyRobotAngles(robot, saved);
      return rows;
    },

    solveDampedLeastSquares(j, error) {
      const lambda2 = this.damping * this.damping;
      const a = [
        [
          dotRows(j[0], j[0]) + lambda2,
          dotRows(j[0], j[1]),
          dotRows(j[0], j[2])
        ],
        [
          dotRows(j[1], j[0]),
          dotRows(j[1], j[1]) + lambda2,
          dotRows(j[1], j[2])
        ],
        [
          dotRows(j[2], j[0]),
          dotRows(j[2], j[1]),
          dotRows(j[2], j[2]) + lambda2
        ]
      ];
      const y = solve3x3(a, [error.x, error.y, error.z]);
      if (!y) return null;
      return this.jointNames.map((name, index) => j[0][index] * y[0] + j[1][index] * y[1] + j[2][index] * y[2]);
    }
  };

  function dotRows(a, b) {
    return a.reduce((sum, value, index) => sum + value * (b[index] || 0), 0);
  }

  function solve3x3(a, b) {
    const det =
      a[0][0] * (a[1][1] * a[2][2] - a[1][2] * a[2][1]) -
      a[0][1] * (a[1][0] * a[2][2] - a[1][2] * a[2][0]) +
      a[0][2] * (a[1][0] * a[2][1] - a[1][1] * a[2][0]);
    if (Math.abs(det) < 1e-9) return null;

    const inv = [
      [
        (a[1][1] * a[2][2] - a[1][2] * a[2][1]) / det,
        (a[0][2] * a[2][1] - a[0][1] * a[2][2]) / det,
        (a[0][1] * a[1][2] - a[0][2] * a[1][1]) / det
      ],
      [
        (a[1][2] * a[2][0] - a[1][0] * a[2][2]) / det,
        (a[0][0] * a[2][2] - a[0][2] * a[2][0]) / det,
        (a[0][2] * a[1][0] - a[0][0] * a[1][2]) / det
      ],
      [
        (a[1][0] * a[2][1] - a[1][1] * a[2][0]) / det,
        (a[0][1] * a[2][0] - a[0][0] * a[2][1]) / det,
        (a[0][0] * a[1][1] - a[0][1] * a[1][0]) / det
      ]
    ];

    return [
      inv[0][0] * b[0] + inv[0][1] * b[1] + inv[0][2] * b[2],
      inv[1][0] * b[0] + inv[1][1] * b[1] + inv[1][2] * b[2],
      inv[2][0] * b[0] + inv[2][1] * b[1] + inv[2][2] * b[2]
    ];
  }

  function updateJointLabel(name) {
    const def = jointDefs.find((item) => item.name === name);
    const label = document.getElementById(`${name}-value`);
    if (!label || !def) return;
    if (def.unit === 'm') {
      const widthMm = currentAngles[name] * 1000;
      label.textContent = `${widthMm.toFixed(0)} 毫米`;
      const readout = document.getElementById('gripper-width');
      if (readout) readout.textContent = `${widthMm.toFixed(0)} 毫米`;
      return;
    }
    label.textContent = `${(currentAngles[name] * RAD).toFixed(1)} 度`;
  }

  function setGripperWidth(widthM) {
    stopPath();
    moveToAngles({ ...currentAngles, gripper: clamp(widthM, 0, GRIPPER_COMMAND_MAX) }, 450);
  }

  function emitCommand(command) {
    commandListeners.forEach((listener) => {
      try {
        listener({ ...command });
      } catch (error) {
        console.warn('Command listener failed:', error);
      }
    });
  }

  function emitJointBatch(angles, source, label) {
    const joints = {};
    jointDefs.forEach((joint) => {
      if (typeof angles[joint.name] === 'number') {
        joints[joint.name] = angles[joint.name];
      }
    });
    if (!Object.keys(joints).length) return;
    emitCommand({
      type: 'joint-batch',
      joints,
      source,
      label,
      stamp: performance.now()
    });
  }

  function playPath() {
    const sequence = ['ready', 'left', 'inspect', 'forward', 'right', 'ready'];
    animation = { sequence, index: 0, nextAt: 0 };
  }

  function stopPath() {
    animation = null;
  }

  function updatePath(now) {
    if (!animation || moveStart) return;
    if (now < animation.nextAt) return;
    applyPreset(animation.sequence[animation.index]);
    animation.index = (animation.index + 1) % animation.sequence.length;
    animation.nextAt = now + 1350;
  }

  function updateTcpHud() {
    const pos = getTcpPosition(robot);
    if (!pos) return;
    tcpMarker.position.copy(pos);

    const ros = threeToRos(pos);
    const planar = Math.sqrt(ros.x * ros.x + ros.y * ros.y);
    const spatial = Math.sqrt(ros.x * ros.x + ros.y * ros.y + ros.z * ros.z);
    els.tcp.textContent = `X ${mm(ros.x)} / Y ${mm(ros.y)} / Z ${mm(ros.z)}`;
    els.reach.textContent = `平面 ${Math.round(planar * 1000)} / 估算 ${Math.round(workspacePlanarReach * 1000)} 毫米 · 3D ${Math.round(spatial * 1000)} 毫米`;
    els.reach.style.color = planar <= workspacePlanarReach ? '#d7fff4' : '#ffd1c9';
  }

  function getTcpPosition(root) {
    if (!root) return null;
    const link = root.getObjectByName('end_link') || root.getObjectByName('link6') || root;
    link.updateMatrixWorld(true);
    const pos = new THREE.Vector3();
    link.getWorldPosition(pos);
    return pos;
  }

  function threeToRos(v) {
    return { x: v.x, y: -v.z, z: v.y };
  }

  function mm(value) {
    return `${Math.round(value * 1000)}毫米`;
  }

  function animate(now) {
    requestAnimationFrame(animate);
    const frameNow = now || performance.now();
    updateMotion(frameNow);
    updateGripperMotion(frameNow);
    updatePath(frameNow);
    updateTeachingPlayback(frameNow);
    updateDragSettling(frameNow);
    updateAxisLabelVisibility(frameNow);
    if (robot) {
      robot.updateMatrixWorld(true);
      updateTcpHud();
      updateDragMarker();
      updateDragErrorLine();
    }
    if (controls) controls.update();
    renderer.render(scene, camera);
  }

  function updateAxisLabelVisibility(now) {
    axisLabelSprites.forEach((sprite) => {
      const hideAt = sprite.userData.autoHideAt || 0;
      const fadeDuration = sprite.userData.fadeDuration || 900;
      if (now <= hideAt) return;

      const progress = clamp((now - hideAt) / fadeDuration, 0, 1);
      const opacity = 1 - progress;
      sprite.material.opacity = opacity;
      sprite.scale.set(0.16 * (1 + progress * 0.12), 0.05 * (1 + progress * 0.12), 1);
      sprite.visible = opacity > 0.02;
    });
  }

  function resize() {
    camera.aspect = getAspect();
    camera.updateProjectionMatrix();
    renderer.setSize(els.host.clientWidth, els.host.clientHeight);
  }

  function resetCamera() {
    if (!camera) return;
    camera.position.set(-0.72, 0.48, 0.74);
    camera.lookAt(0.18, 0.18, 0);
    if (controls) {
      controls.target.set(0.18, 0.18, 0);
      controls.sync();
    }
  }

  function getAspect() {
    return Math.max(1, els.host.clientWidth) / Math.max(1, els.host.clientHeight);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function makeTextSprite(text, color) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 160;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(17, 18, 17, 0.72)';
    roundRect(ctx, 10, 24, 492, 92, 14);
    ctx.fill();
    ctx.font = '700 38px "Microsoft YaHei", Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
    ctx.fillText(text, 256, 70);

    const texture = new THREE.CanvasTexture(canvas);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false }));
    sprite.scale.set(0.16, 0.05, 1);
    return sprite;
  }

  function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  function setGripperWidth(widthM, options) {
    const target = clamp(widthM, 0, GRIPPER_COMMAND_MAX);
    const source = options && options.source ? options.source : 'gripper';
    const immediate = options && options.immediate;
    const emit = !(options && options.emit === false);

    gripperMotion = null;
    if (immediate) {
      setJoint('gripper', target, false, { source, emit });
      syncGhostToRobot();
      return;
    }

    gripperMotion = {
      start: currentAngles.gripper || 0,
      target,
      startedAt: performance.now(),
      duration: options && options.duration ? Math.max(Number(options.duration), 1) : GRIPPER_ANIMATION_MS,
      source,
      emit
    };
  }

  function updateGripperMotion(now) {
    if (!gripperMotion) return;

    const t = clamp((now - gripperMotion.startedAt) / gripperMotion.duration, 0, 1);
    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const value = gripperMotion.start + (gripperMotion.target - gripperMotion.start) * eased;
    setJoint('gripper', value, false, {
      source: gripperMotion.source,
      emit: gripperMotion.emit && t >= 1
    });
    syncGhostToRobot();

    if (t >= 1) gripperMotion = null;
  }

  window.reBotSim = {
    getAngles() {
      return { ...currentAngles };
    },
    getJointDefs() {
      return jointDefs.map((joint) => ({ ...joint }));
    },
    getTeachingWaypoints() {
      return teachingWaypoints.map((point) => ({
        ...point,
        joints: { ...point.joints },
        tcp_ros: { ...point.tcp_ros }
      }));
    },
    setAngles(angles, options) {
      if (!angles || typeof angles !== 'object') return;
      const source = options && options.source ? options.source : 'api';
      if (source === 'ros' && (teachingPlayback || moveStart || animation || draggingTcp || dragSettling || gripperMotion)) return;
      if (source !== 'ros') {
        stopPath();
        teachingPlayback = null;
        moveStart = 0;
      }
      Object.entries(angles).forEach(([name, value]) => {
        setJoint(name, value, false, options || {});
      });
      syncGhostToRobot();
    },
    setGripperWidth(widthM, options) {
      const source = options && options.source ? options.source : 'api';
      if (source === 'ros' && (teachingPlayback || moveStart || animation || draggingTcp || dragSettling || gripperMotion)) return;
      if (source !== 'ros') {
        stopPath();
        teachingPlayback = null;
        moveStart = 0;
      }
      if (options && options.animate) {
        setGripperWidth(widthM, options);
      } else {
        setJoint('gripper', clamp(widthM, 0, GRIPPER_COMMAND_MAX), false, options || {});
        syncGhostToRobot();
      }
    },
    generateTrajectory,
    setDragMode(enabled) {
      if (Boolean(enabled) !== dragMode) toggleDragMode();
    },
    onCommand(listener) {
      if (typeof listener !== 'function') return () => {};
      commandListeners.add(listener);
      return () => commandListeners.delete(listener);
    }
  };

  function createOrbit(cam, dom, initialTarget) {
    let rotating = false;
    let panning = false;
    let lastX = 0;
    let lastY = 0;
    const target = initialTarget.clone();
    const spherical = new THREE.Spherical();
    const offset = new THREE.Vector3();

    function sync() {
      offset.copy(cam.position).sub(target);
      spherical.setFromVector3(offset);
    }
    sync();

    dom.addEventListener('pointerdown', (event) => {
      dom.setPointerCapture(event.pointerId);
      rotating = event.button === 0;
      panning = event.button === 2;
      lastX = event.clientX;
      lastY = event.clientY;
    });

    dom.addEventListener('pointermove', (event) => {
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;

      if (rotating) {
        spherical.theta -= dx * 0.006;
        spherical.phi = clamp(spherical.phi - dy * 0.006, 0.12, Math.PI - 0.08);
      }

      if (panning) {
        const distance = cam.position.distanceTo(target);
        const right = new THREE.Vector3();
        const up = new THREE.Vector3(0, 1, 0);
        cam.getWorldDirection(right).cross(up).normalize();
        target.add(right.multiplyScalar(-dx * distance * 0.0015));
        target.y += dy * distance * 0.0015;
      }
    });

    dom.addEventListener('pointerup', (event) => {
      rotating = false;
      panning = false;
      if (dom.hasPointerCapture(event.pointerId)) dom.releasePointerCapture(event.pointerId);
    });

    dom.addEventListener('wheel', (event) => {
      event.preventDefault();
      spherical.radius = clamp(spherical.radius * (event.deltaY > 0 ? 1.08 : 0.92), 0.24, 4);
    }, { passive: false });

    dom.addEventListener('contextmenu', (event) => event.preventDefault());

    return {
      target,
      sync,
      update() {
        offset.setFromSpherical(spherical);
        cam.position.copy(target).add(offset);
        cam.lookAt(target);
      }
    };
  }
})();
