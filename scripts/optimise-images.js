#!/usr/bin/env node
const fs = require('fs').promises;
const del = require('del');
const createLoggerFn = require('./utils/logger');
const createImageRenditions = require('./utils/create-image-renditions');

const logger = {
  info: createLoggerFn(console.info, '  '),
  warn: createLoggerFn(console.warn, '⚠️'),
  error: createLoggerFn(console.error, '🚨')
};

const exec = async () => {
  try {
    const { renditions, optimiseConfig } = JSON.parse(await fs.readFile('images.json'));

    await del(optimiseConfig.outputDir);
    await fs.mkdir(optimiseConfig.outputDir, { recursive: true });

    await createImageRenditions({
      args: {
        renditions,
        ...optimiseConfig
      },
      logger
    });

    logger.info('Finished!', '✅');
  } catch (err) {
    logger.error(err);
    logger.error('Something went wrong, terminating process');
    setImmediate(process.exit.bind(process, 1));
  }
};

exec();
