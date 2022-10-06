const rateLimiter = require('express-rate-limit');

module.exports = rateLimiter({
  windowMs: 90000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
