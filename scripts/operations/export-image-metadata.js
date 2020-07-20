const path = require('path');
const fs = require('fs').promises;
const sharp = require('sharp');

const getSerializableImageMetadata = async (inputPath, filename) => {
  try {
    const image = sharp(path.join(inputPath, filename));

    const imageMetadata = await image.metadata();

    return {
      filename,
      format: imageMetadata.format || null,
      width: imageMetadata.width || null,
      height: imageMetadata.height || null,
    };
  } catch (error) {
    error.message = `Error getting image metadata for ${filename}:\n${error.message || ''}`;
    throw error;
  }
};

const exportImageMetadata = async (context, args, filenames) => {
  const { logger } = context;

  const accumulatedImageMetadata = [];

  for (imageFilename of filenames) {
    const imageMetadata = await getSerializableImageMetadata(args.input, imageFilename);
    accumulatedImageMetadata.push(imageMetadata);
  }

  const jsonMetadata = JSON.stringify({ imageMetadata: accumulatedImageMetadata });

  const outputFilePaths = args.output.map(outputDirPath => path.join(outputDirPath, 'metadata.json'));

  for (filePath of outputFilePaths) {
    await fs.writeFile(filePath, jsonMetadata, { encoding: 'utf8' });
    logger.debug(`Exported ${filePath}`, '📄');
  }
};

module.exports = exportImageMetadata;
