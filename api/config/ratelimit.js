const rateLimit = require("express-rate-limit");

const initRateLimit = rateLimit({
    windowMs: 1 * 60 * 60 * 1000, // 1 hour duration in milliseconds
    max: 20,
    message: "You exceeded your request quota",
    headers: true,
});

module.exports = initRateLimit;

