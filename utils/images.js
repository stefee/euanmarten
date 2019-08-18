const FILE_EXT_DELIMITER = '.';

const splitFileExtension = filename => {
  const filenameSegments = filename.split(FILE_EXT_DELIMITER);
  const fileExtension = filenameSegments.pop();
  return [fileExtension, filenameSegments.join(FILE_EXT_DELIMITER)];
};

const getRenditionFilename = (filename, { width, height }) => {
  const [imageFileExtension, imageName] = splitFileExtension(filename);
  const renditionName = height ? `${width}x${height}` : width.toString();
  return `${imageName}_${renditionName}${FILE_EXT_DELIMITER}${imageFileExtension}`;
};

const getImageSrc = ({ filename }, rendition) => {
  if (rendition) {
    const renditionFilename = getRenditionFilename(filename, rendition);
    return `/static/images/${renditionFilename}`;
  } else {
    return `/static/images/${filename}`;
  }
};

module.exports = {
  splitFileExtension,
  getRenditionFilename,
  getImageSrc
};
