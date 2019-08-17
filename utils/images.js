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

module.exports = {
  splitFileExtension,
  getRenditionFilename
};
