const { getReasonPhrase } = require("http-status-codes");

const response = (ctx, status, data = undefined, metadata = undefined) => {
  const message = getReasonPhrase(status);
  ctx.status(status).json({
    success: true,
    message,
    data,
    metadata,
  });
};

module.exports = response;
