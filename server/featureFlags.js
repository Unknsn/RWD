const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const filePath = path.join(dataDir, 'feature-flags.json');

function ensureStore() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '{}', 'utf8');
}

function load() {
  ensureStore();
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return {};
  }
}

function save(flags) {
  ensureStore();
  fs.writeFileSync(filePath, JSON.stringify(flags, null, 2), 'utf8');
}

function getFlags() {
  return load();
}

function setFlag(key, value) {
  const flags = load();
  flags[key] = value;
  save(flags);
  return flags;
}

module.exports = { getFlags, setFlag };
