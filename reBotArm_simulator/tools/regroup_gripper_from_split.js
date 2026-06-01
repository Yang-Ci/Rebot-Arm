const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SPLIT_DIR = path.join(ROOT, 'split_meshes', 'end_link');
const OUT_DIR = path.join(ROOT, 'split_meshes', 'grouped_gripper');
const REPORT = path.join(SPLIT_DIR, 'split_report.csv');
const SIDE_THRESHOLD = 0.010;
const MOVING_SIDE_LIMIT = 0.036;
const MOVING_MIN_EXTENT = 0.020;

function parseCsvLine(line) {
  const out = [];
  let cur = '';
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      quoted = !quoted;
    } else if (ch === ',' && !quoted) {
      out.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}

function readReport() {
  const lines = fs.readFileSync(REPORT, 'utf8').trim().split(/\r?\n/);
  const header = parseCsvLine(lines.shift());
  return lines.map((line) => {
    const cells = parseCsvLine(line);
    const row = {};
    header.forEach((name, index) => row[name] = cells[index]);
    return row;
  });
}

function readTriangles(stlPath) {
  const buf = fs.readFileSync(stlPath);
  if (buf.length < 84) return [];
  const count = buf.readUInt32LE(80);
  const triangles = [];
  for (let i = 0; i < count; i++) {
    const start = 84 + i * 50;
    triangles.push(buf.subarray(start, start + 50));
  }
  return triangles;
}

function writeStl(stlPath, triangles) {
  const header = Buffer.alloc(80, ' ');
  Buffer.from('reBot regrouped gripper STL').copy(header);
  const count = Buffer.alloc(4);
  count.writeUInt32LE(triangles.length, 0);
  fs.writeFileSync(stlPath, Buffer.concat([header, count, ...triangles]));
}

function splitFileForName(name) {
  return path.join(SPLIT_DIR, `${name}.stl`);
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const groups = {
    gripper_base: [],
    gripper_hardware: [],
    left_finger: [],
    right_finger: []
  };

  for (const row of readReport()) {
    const centerY = Number(row.center_y);
    const side = Math.abs(centerY);
    const sizeX = Number(row.size_x);
    const sizeY = Number(row.size_y);
    const sizeZ = Number(row.size_z);
    const largeEnoughToMove = Math.max(sizeX, sizeY, sizeZ) >= MOVING_MIN_EXTENT;
    const inFingerTravelBand = side > SIDE_THRESHOLD && side < MOVING_SIDE_LIMIT;
    const target = inFingerTravelBand && largeEnoughToMove
      ? centerY > 0 ? 'left_finger' : 'right_finger'
      : side > SIDE_THRESHOLD ? 'gripper_hardware' : 'gripper_base';
    const stlPath = splitFileForName(row.name);
    groups[target].push(...readTriangles(stlPath));
  }

  for (const [name, triangles] of Object.entries(groups)) {
    const outPath = path.join(OUT_DIR, `${name}.stl`);
    writeStl(outPath, triangles);
    console.log(`${name}.stl`, triangles.length, 'triangles', fs.statSync(outPath).size, 'bytes');
  }
}

main();
