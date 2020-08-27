const path = require('path');
const fs = require('fs').promises;
const del = require('del');
const { splitFileExtension } = require('../utils/images');
const createLoggerFn = require('./utils/logger');
const createImageRenditions = require('./operations/create-image-renditions');
const exportImageMetadata = require('./operations/export-image-metadata');

const logger = {
  debug: createLoggerFn(console.debug, '  '),
  info: createLoggerFn(console.info, '  '),
  warn: createLoggerFn(console.warn, '⚠️'),
  error: createLoggerFn(console.error, '🚨')
};

const getImageFilenames = async (pathToDir, allowedFileTypes) => {
  const files = await fs.readdir(pathToDir);

  const imageFilenames = files.filter(filename => {
    const [extension] = splitFileExtension(filename);
    return extension && allowedFileTypes.includes(extension.toLowerCase());
  });

  return imageFilenames;
};

const buildAllImages = async () => {
  try {
    logger.debug('Starting images build...');

    const { imageRenditions, imageBuildConfig } = JSON.parse(await fs.readFile('./config.json'));

    logger.debug('Creating output directories...');

    const outputDirJobs = imageBuildConfig.output.map(outputPath => async () => {
      await del(outputPath);
      await fs.mkdir(path.join(outputPath, 'renditions'), { recursive: true });
    });

    await Promise.all(outputDirJobs.map(job => job()));

    logger.debug(`Finding images in directory ${imageBuildConfig.input}...`, '🔎');

    const filenames = await getImageFilenames(imageBuildConfig.input, imageBuildConfig.fileTypes);

    logger.debug(`Exporting image metadata for ${filenames.length} images...`);

    await exportImageMetadata({ logger}, imageBuildConfig, filenames);

    logger.debug(`Creating optimised renditions for ${filenames.length} images...`);

    await createImageRenditions({ logger }, imageBuildConfig, filenames, imageRenditions);

    logger.debug('Finished building images', '✅');
  } catch (error) {
    logger.error(error);
    logger.error('Something went wrong, terminating process');
    setImmediate(process.exit.bind(process, 1));
  }
};

const buildSingleImage = async (filename) => {
  try {
    logger.debug('Starting single image build...');

    const { imageRenditions, imageBuildConfig } = JSON.parse(await fs.readFile('./config.json'));

    logger.debug(`Creating optimised renditions for ${filename}...`);

    await createImageRenditions({ logger }, imageBuildConfig, [filename], imageRenditions);

    logger.debug('Finished building image', '✅');
  } catch (error) {
    logger.error(error);
    logger.error('Something went wrong, terminating process');
    setImmediate(process.exit.bind(process, 1));
  }
};

const exec = async () => {
  const args = process.argv.slice(2);

  if (args.length > 0) {
    await buildSingleImage(args[0]);
  } else {
    await buildAllImages();
  }
};

exec();
