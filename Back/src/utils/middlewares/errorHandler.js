function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || err;
  return res.status(status).json({ msg: message });
}
module.exports = errorHandler;
