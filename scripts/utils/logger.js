const loggerFn = (fn, defaultPrefix, noPrefix, msg, prefix = null) =>
  fn(!noPrefix && typeof msg === 'string' ? `${prefix || defaultPrefix} ${msg}` : msg);

const createLoggerFn = (fn, defaultPrefix) => {
  const isCI = process.env.NODE_ENV === 'ci';
  return loggerFn.bind(null, fn, defaultPrefix, isCI);
};

module.exports = createLoggerFn;
