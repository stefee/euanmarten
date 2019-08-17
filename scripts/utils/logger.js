const loggerFn = (fn, defaultPrefix, msg, prefix = null) =>
  fn(typeof msg === 'string' ? `${prefix || defaultPrefix} ${msg}` : msg);

const createLoggerFn = (fn, defaultPrefix) => loggerFn.bind(null, fn, defaultPrefix);

module.exports = createLoggerFn;
