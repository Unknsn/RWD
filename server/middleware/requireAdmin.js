const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

module.exports = function requireAdmin(req, res, next) {
  if (!ADMIN_TOKEN) {
    return res.status(503).json({ error: 'ADMIN_TOKEN not configured' });
  }
  const authHeader = req.headers.authorization || '';
  const bearer = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const token = req.get('x-admin-token') || bearer;

  if (!token || token !== ADMIN_TOKEN) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  next();
};
