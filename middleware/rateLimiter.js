const rateLimit = require('express-rate-limit');

const { FIVE_MINUTES_IN_MILLISECONDS, MAX_NUMBER_OF_REQUESTS } = require('../constants');

const limiter = rateLimit({
  windowMs: FIVE_MINUTES_IN_MILLISECONDS,
  max: MAX_NUMBER_OF_REQUESTS,
  message: 'Too many requests from this IP, please try again after an 5 minutes',
});

module.exports = limiter;
