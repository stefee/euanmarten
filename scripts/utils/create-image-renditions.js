const path = require('path');
const fs = require('fs').promises;
const promiseLimit = require('promise-limit');
const sharp = require('sharp');
const { splitFileExtension, getRenditionFilename } = require('../../utils/images');

const getImageFilenames = async (pathToDir, allowedFileTypes) => {
  const files = await fs.readdir(pathToDir);

  const imageFilenames = files.filter(filename => {
    const [extension] = splitFileExtension(filename);
    return extension && allowedFileTypes.includes(extension.toLowerCase());
  });

  return imageFilenames;
};

const getImageFormat = imageData => {
  const { format } = imageData;

  if (typeof format !== 'string') {
    throw new Error(`Failed to determine image format for ${filename}`);
  }

  return format;
};

const optimiseImage = async (context, image, width, height) => {
  const { args } = context;

  const imageData = await image.metadata();

  const imageFormat = getImageFormat(imageData);

  const compression = args.compression[imageFormat] || args.defaultCompression;

  const resizedImage = image.resize(width, height, args.resizeOptions);

  return resizedImage[compression]({ quality: args.quality[compression] });
};

const createRendition = async (context, inputPath, outputPaths, filename, rendition) => {
  const { logger } = context;

  const renditionFilename = getRenditionFilename(filename, rendition);

  try {
    const image = sharp(path.join(inputPath, filename));

    const { width, height } = rendition;

    logger.info(`Optimising ${renditionFilename}...`, '🔧');

    const optimisedImage = await optimiseImage({ ...context, filename }, image, width, height);

    const renditionPaths = outputPaths.map(output => path.join(output, renditionFilename));

    const writeImageJobs = renditionPaths.map(path => async () => {
      await optimisedImage.toFile(path);
      logger.info(`Created ${path}`, '✨');
    });

    await Promise.all(writeImageJobs.map(job => job()));
  } catch (err) {
    err.message = `Error creating rendition ${renditionFilename}:\n${err.message || ''}`;
    throw err;
  }
};

const createImageRenditions = async (context, renditions, args) => {
  const { logger } = context;

  logger.info(`Finding images in directory ${args.input}...`, '🔎');

  const filenames = await getImageFilenames(args.input, args.fileTypes);

  logger.info(`Creating optimised renditions for ${filenames.length} images...`);

  const contextWithArgs = { ...context, args };
  const renditionPromiseLimit = promiseLimit(args.concurrency);

  const renditionPromises = filenames.reduce((acc, filename) => {
    const jobs = renditions.map(rendition => () => {
      return createRendition(contextWithArgs, args.input, args.output, filename, rendition);
    });

    const promises = jobs.map(job => renditionPromiseLimit(() => job()));

    acc.push(...promises);

    return acc;
  }, []);

  return Promise.all(renditionPromises);
};

module.exports = createImageRenditions;
