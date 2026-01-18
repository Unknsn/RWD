const express = require('express');
const app = express();

// ...existing middleware and routes...

// Only listen locally; Vercel will invoke the handler instead.
if (process.env.VERCEL !== '1') {
  app.listen(process.env.PORT || 4000, () => {
    console.log('Server running');
  });
}

// Export a serverless handler for Vercel
module.exports = (req, res) => app(req, res);