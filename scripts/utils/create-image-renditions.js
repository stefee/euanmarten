const path = require('path');
const fs = require('fs').promises;
const promiseLimit = require('promise-limit');
const gm = require('gm');

const DEFAULT_COMPRESSION = 'jpeg';

const splitFileExtension = filename => {
  const DELIMITER = '.';
  const filenameSegments = filename.split(DELIMITER);
  const fileExtension = filenameSegments.pop();
  return [fileExtension, filenameSegments.join(DELIMITER)];
};

const getImageFilenames = async ({ args }, pathToDir) => {
  const files = await fs.readdir(pathToDir);

  const imageFilenames = files.filter(filename => {
    const [extension] = splitFileExtension(filename);
    return extension && args.fileTypes.includes(extension.toLowerCase());
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

const optimiseImage = async (context, width, height, image) => {
  const { args } = context;

  const imageFormat = await getImageFormat(context, image);

  const compression = args.compressionTypes[imageFormat] && args.quality[imageFormat]
    ? imageFormat
    : args.defaultCompression || DEFAULT_COMPRESSION;

  return image
    .resize(width, height, args.resizeOptions)
    .quality(args.quality[compression])
    .noProfile();
};

const createRendition = async (context, inputPath, outputPath, filename, { width, height }) => {
  const { logger } = context;

  const [imageFileExtension, imageName] = splitFileExtension(filename);

  const renditionName = height ? `${width}x${height}` : width.toString();
  const renditionFilename = `${imageName}_${renditionName}.${imageFileExtension}`;

  const imagePath = path.join(inputPath, filename);
  const renditionPath = path.join(outputPath, renditionFilename);

  try {
    const image = gm(imagePath);

    const optimisedImage = await optimiseImage({ ...context, filename }, width, height, image);

    await writeImage(optimisedImage, renditionPath);

    logger.info(`Created ${renditionPath}`, '✨');
  } catch (err) {
    err.message = `Error creating rendition ${renditionFilename}:\n${err.message || ''}`;
    throw err;
  }
};

const createImageRenditions = async context => {
  const { logger, args } = context;
  const { inputDir, outputDir, renditions } = args;

  logger.info(`Finding images in directory ${args.inputDir}`, '🔎');

  const filenames = await getImageFilenames(context, args.inputDir);

  logger.info(`Creating optimised renditions for ${filenames.length} images`);

  const renditionPromiesLimit = promiseLimit(args.concurrency);

  const renditionPromises = filenames.reduce((acc, filename) => {
    const jobs = renditions.map(rendition => () => {
      return createRendition(context, inputDir, outputDir, filename, rendition);
    });

    const promises = jobs.map(job => renditionPromiesLimit(() => job()));

    acc.push(...promises);

    return acc;
  }, []);

  return Promise.all(renditionPromises);
};

module.exports = createImageRenditions;
