#!/usr/bin/env node
const fs = require('fs').promises;
const del = require('del');
const createLoggerFn = require('./utils/logger');
const buildImageRenditions = require('./utils/build-image-renditions');

const logger = {
  debug: createLoggerFn(console.debug, '  '),
  info: createLoggerFn(console.info, '  '),
  warn: createLoggerFn(console.warn, '⚠️'),
  error: createLoggerFn(console.error, '🚨')
};

const exec = async () => {
  try {
    logger.debug('Starting images build...');

    const { renditions, buildConfig } = JSON.parse(await fs.readFile('images.json'));

    logger.debug('Removing output directory...');

    await del(buildConfig.outputDir);
    await fs.mkdir(buildConfig.outputDir, { recursive: true });

    logger.debug('Building renditions...');

    await buildImageRenditions({ logger }, renditions, buildConfig);

    logger.info('Finished building image renditions.', '✅');

    setImmediate(process.exit.bind(process, 0));
  } catch (err) {
    logger.error(err);
    logger.error('Something went wrong, terminating process');
    setImmediate(process.exit.bind(process, 1));
  }
};

exec();
