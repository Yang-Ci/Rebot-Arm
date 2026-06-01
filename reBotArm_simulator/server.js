const http = require('http');
const https = require('https');
const fs = require('fs');
const os = require('os');
const path = require('path');

const USE_HTTPS = process.env.HTTPS === '1';
const PORT = Number(process.env.PORT || (USE_HTTPS ? 3443 : 3001));
const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, 'public');
const BRINGUP_DIR = path.resolve(
  path.join(ROOT, '..', 'reBotArmController_ROS2-main', 'src', 'rebotarm_bringup')
);
const URDF_FILE = path.join(BRINGUP_DIR, 'description', 'urdf', 'reBot-DevArm_fixend.urdf');
const MESHES_DIR = path.join(BRINGUP_DIR, 'description', 'meshes');
const GRIPPER_MESHES_DIR = path.join(ROOT, 'split_meshes', 'grouped_gripper');
const DEFAULT_KEY_FILE = path.join(ROOT, '.certs', 'rebotarm-local-server.key');
const DEFAULT_CERT_FILE = path.join(ROOT, '.certs', 'rebotarm-local-server.crt');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.stl': 'model/stl',
  '.STL': 'model/stl',
  '.urdf': 'application/xml; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

function send(res, status, body, type) {
  res.writeHead(status, {
    'Content-Type': type || 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

function sendJson(res, status, body) {
  send(res, status, JSON.stringify(body, null, 2), MIME_TYPES['.json']);
}

function sendFile(res, filePath) {
  fs.stat(filePath, (statErr, stat) => {
    if (statErr || !stat.isFile()) {
      sendJson(res, 404, { error: 'File not found' });
      return;
    }

    const ext = path.extname(filePath);
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Content-Length': stat.size,
      'Cache-Control': ext.toLowerCase() === '.stl' ? 'public, max-age=3600' : 'no-store'
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

function safePublicPath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split('?')[0]);
  const relative = cleanPath === '/' ? 'index.html' : cleanPath.replace(/^\/+/, '');
  const filePath = path.resolve(path.join(PUBLIC_DIR, relative));
  if (!filePath.startsWith(PUBLIC_DIR)) return null;
  return filePath;
}

function sendMesh(res, filename) {
  const safeName = path.basename(filename);
  sendFile(res, path.join(MESHES_DIR, safeName));
}

function sendGripperMesh(res, filename) {
  const safeName = path.basename(filename);
  sendFile(res, path.join(GRIPPER_MESHES_DIR, safeName));
}

function getLanAddresses() {
  return Object.values(os.networkInterfaces())
    .flat()
    .filter((item) => item && item.family === 'IPv4' && !item.internal)
    .map((item) => item.address);
}

function requestHandler(req, res) {
  const urlPath = req.url.split('?')[0];

  if (urlPath === '/api/config') {
    sendJson(res, 200, {
      name: 'reBot Arm B601-DM',
      frame: {
        rosX: 'forward',
        rosY: 'left',
        rosZ: 'up',
        threeMapping: { x: 'ros_x', y: 'ros_z', z: '-ros_y' }
      },
      reachMeters: 0.65,
      payloadKg: 1.5,
      gripper: {
        name: 'gripper',
        motorId: '0x07',
        closedMeters: 0,
        openMeters: 0.09,
        visualOpenMeters: 0.057,
        rosService: '/rebotarm/gripper/set'
      }
    });
    return;
  }

  if (urlPath === '/api/urdf') {
    sendFile(res, URDF_FILE);
    return;
  }

  const meshMatch = urlPath.match(/^\/api\/(?:description\/)?meshes\/(.+)$/);
  if (meshMatch) {
    sendMesh(res, meshMatch[1]);
    return;
  }

  const gripperMeshMatch = urlPath.match(/^\/api\/gripper_meshes\/(.+)$/);
  if (gripperMeshMatch) {
    sendGripperMesh(res, gripperMeshMatch[1]);
    return;
  }

  const filePath = safePublicPath(urlPath);
  if (!filePath) {
    sendJson(res, 403, { error: 'Forbidden' });
    return;
  }

  sendFile(res, filePath);
}

function createServer() {
  if (!USE_HTTPS) return http.createServer(requestHandler);

  const keyFile = process.env.HTTPS_KEY || DEFAULT_KEY_FILE;
  const certFile = process.env.HTTPS_CERT || DEFAULT_CERT_FILE;

  if (!fs.existsSync(keyFile) || !fs.existsSync(certFile)) {
    console.error(`HTTPS certificate not found: ${keyFile} / ${certFile}`);
    console.error('Run: npm run cert:dev');
    process.exit(1);
  }

  return https.createServer({
    key: fs.readFileSync(keyFile),
    cert: fs.readFileSync(certFile)
  }, requestHandler);
}

const server = createServer();

server.listen(PORT, () => {
  const protocol = USE_HTTPS ? 'https' : 'http';
  const lanAddresses = getLanAddresses();
  console.log('========================================');
  console.log('  reBot Arm B601-DM Simulator Started');
  console.log('========================================');
  console.log(`  Local: ${protocol}://localhost:${PORT}`);
  lanAddresses.forEach((address) => console.log(`  LAN:   ${protocol}://${address}:${PORT}`));
  console.log(`  URDF:  ${protocol}://localhost:${PORT}/api/urdf`);
  console.log(`  Mesh:  ${protocol}://localhost:${PORT}/api/description/meshes/base_link.STL`);
  console.log(`  Gripper meshes: ${GRIPPER_MESHES_DIR}`);
  console.log('----------------------------------------');
  console.log(`  URDF file: ${URDF_FILE}`);
  console.log(`  Mesh dir:  ${MESHES_DIR}`);
});
