const express = require('express');
const requireAdmin = require('./middleware/requireAdmin');
const { getFlags, setFlag } = require('./featureFlags');
const jobs = require('./adminJobs');

const router = express.Router();
router.use(requireAdmin);
router.use(express.json());

router.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

router.get('/stats', (req, res) => {
  const mem = process.memoryUsage();
  res.json({
    uptimeSeconds: Math.round(process.uptime()),
    rssBytes: mem.rss,
    heapUsedBytes: mem.heapUsed
  });
});

router.post('/invalidate-cache', async (req, res) => {
  // TODO: connect to your cache layer
  res.json({ invalidated: true });
});

// Feature flags
router.get('/flags', (req, res) => {
  res.json(getFlags());
});

router.put('/flags/:key', (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  res.json(setFlag(key, value));
});

// Jobs control
router.post('/jobs/start', (req, res) => {
  const { intervalMs } = req.body || {};
  res.json(jobs.start(intervalMs));
});

router.post('/jobs/stop', (req, res) => {
  res.json(jobs.stop());
});

router.get('/jobs/status', (req, res) => {
  res.json(jobs.status());
});

// Sanitized environment
router.get('/env', (req, res) => {
  const allow = ['NODE_ENV', 'PORT', 'VERSION'];
  const env = {};
  for (const k of allow) env[k] = process.env[k] || null;
  env.ADMIN_TOKEN_SET = !!process.env.ADMIN_TOKEN;
  res.json(env);
});

module.exports = router;
