const path = require('path');
const fs = require('fs').promises;
const promiseLimit = require('promise-limit');
const gm = require('gm');
const { splitFileExtension, getRenditionFilename } = require('../../utils/images');

const getImageFilenames = async (pathToDir, allowedFileTypes) => {
  const files = await fs.readdir(pathToDir);

  const imageFilenames = files.filter(filename => {
    const [extension] = splitFileExtension(filename);
    return extension && allowedFileTypes.includes(extension.toLowerCase());
  });

  return imageFilenames;
};

const writeImage = (image, path) => {
  return new Promise((resolve, reject) => {
    image.write(path, err => {
      if (err) {
        return reject(err);
      }

      resolve(image);
    });
  });
};

const getImageFormat = ({ filename }, image) => {
  return new Promise((resolve, reject) => {
    image.format((err, value) => {
      if (err) {
        return reject(err);
      }

      if (typeof value !== 'string') {
        return reject(new Error(`Failed to determine image format for ${filename}`));
      }

      return resolve(value.toLowerCase());
    });
  });
};

const optimiseImage = async (context, image, width, height) => {
  const { args } = context;

  const imageFormat = await getImageFormat(context, image);

  const compression = args.compression[imageFormat] || args.defaultCompression;

  return image
    .resize(width, height, args.resizeOptions)
    .quality(args.quality[compression])
    .noProfile();
};

const createRendition = async (context, inputPath, outputPaths, filename, rendition) => {
  const { logger } = context;

  const renditionFilename = getRenditionFilename(filename, rendition);

  const imagePath = path.join(inputPath, filename);
  const renditionPaths = outputPaths.map(p => path.join(p, renditionFilename));

  try {
    const image = gm(imagePath);

    const { width, height } = rendition;

    logger.info(`Optimising ${renditionFilename}...`, '🔧');

    const optimisedImage = await optimiseImage({ ...context, filename }, image, width, height);

    const writeImageJobs = renditionPaths.map(path => async () => {
      await writeImage(optimisedImage, path);

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
  const { inputDir, outputDir } = args;

  logger.info(`Finding images in directory ${args.inputDir}...`, '🔎');

  const filenames = await getImageFilenames(args.inputDir, args.fileTypes);

  logger.info(`Creating optimised renditions for ${filenames.length} images...`);

  const contextWithArgs = { ...context, args };
  const renditionPromiseLimit = promiseLimit(args.concurrency);

  const renditionPromises = filenames.reduce((acc, filename) => {
    const jobs = renditions.map(rendition => () => {
      return createRendition(contextWithArgs, inputDir, outputDir, filename, rendition);
    });

    const promises = jobs.map(job => renditionPromiseLimit(() => job()));

    acc.push(...promises);

    return acc;
  }, []);

  return Promise.all(renditionPromises);
};

module.exports = createImageRenditions;
