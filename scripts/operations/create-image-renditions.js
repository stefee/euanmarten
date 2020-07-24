const path = require('path');
const promiseLimit = require('promise-limit');
const sharp = require('sharp');
const { getRenditionFilename } = require('../../utils/images');

const optimiseImage = async (context, image, compression, width, height) => {
  const { args } = context;

  const resizedImage = image.resize(width, height, args.resizeOptions);

  return resizedImage[compression]({ quality: args.quality[compression] });
};

const createRendition = async (context, inputPath, outputPaths, filename, rendition) => {
  const { logger, args } = context;
  const { width, height } = rendition;

  try {
    const image = sharp(path.join(inputPath, filename));

    const imageMetadata = await image.metadata();

    const compressionTargets = args.compressionTargets[imageMetadata.format];

    for (const compression of compressionTargets) {
      const renditionFilename = getRenditionFilename(filename, compression, rendition);

      logger.debug(`Optimising ${renditionFilename}...`, '🔧');

      const optimisedImage = await optimiseImage(context, image, compression, width, height);

      const renditionPaths = outputPaths.map(output => path.join(output, 'renditions', renditionFilename));

      const writeImageJobs = renditionPaths.map(outputFilePath => async () => {
        await optimisedImage.toFile(outputFilePath);
        logger.debug(`Created ${outputFilePath}`, '✨');
      });

      await Promise.all(writeImageJobs.map(job => job()));
    }
  } catch (error) {
    error.message = `Error creating rendition (width: ${width}${height ? `, height: ${height}` : ''}) for ${filename}:\n${error.message || ''}`;
    throw error;
  }
};

const createImageRenditions = async (context, args, filenames, renditions) => {
  const limit = promiseLimit(args.concurrency);

  const accumulatedPromises = filenames.reduce((acc, filename) => {
    const jobs = renditions.map(rendition => () => {
      return createRendition({ ...context, args }, args.input, args.output, filename, rendition);
    });

    const promises = jobs.map(job => limit(() => job()));

    acc.push(...promises);

    return acc;
  }, []);

  return Promise.all(accumulatedPromises);
};

module.exports = createImageRenditions;
