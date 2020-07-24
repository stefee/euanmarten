const FILE_EXT_DELIMITER = '.';

const splitFileExtension = filename => {
  const filenameSegments = filename.split(FILE_EXT_DELIMITER);
  const fileExtension = filenameSegments.pop();
  return [fileExtension, filenameSegments.join(FILE_EXT_DELIMITER)];
};

const getRenditionFilename = (filename, renditionFileExtension, rendition) => {
  const { width, height } = rendition;
  const [_, imageName] = splitFileExtension(filename);
  const renditionName = height ? `${width}x${height}` : width.toString();
  return `${imageName}_${renditionName}${FILE_EXT_DELIMITER}${renditionFileExtension}`;
};

const getImageSrc = ({ filename }, fileExtension, rendition) => {
  if (rendition) {
    const renditionFilename = getRenditionFilename(filename, fileExtension, rendition);
    return `/static/images-dist/renditions/${renditionFilename}`;
  } else {
    return [`/static/images/${filename}`];
  }
};

module.exports = {
  splitFileExtension,
  getRenditionFilename,
  getImageSrc
};
