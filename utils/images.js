const splitFileExtension = filename => {
  const DELIMITER = '.';
  const filenameSegments = filename.split(DELIMITER);
  const fileExtension = filenameSegments.pop();
  return [fileExtension, filenameSegments.join(DELIMITER)];
};

const getRenditionFilename = (filename, { width, height }) => {
  const [imageFileExtension, imageName] = splitFileExtension(filename);
  const renditionName = height ? `${width}x${height}` : width.toString();
  return `${imageName}_${renditionName}.${imageFileExtension}`;
};

const getImageSrc = (filename, rendition) => {
  if (rendition) {
    const renditionFilename = getRenditionFilename(filename, rendition);
    return `/static/images/renditions/${renditionFilename}`;
  } else {
    return `/static/images/${filename}`;
  }
};

module.exports = {
  splitFileExtension,
  getRenditionFilename,
  getImageSrc
};
