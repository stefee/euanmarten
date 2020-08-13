import { getImageSrc } from '../utils/images';
import Picture from './Picture';

const Image = ({ image, appConfig, size = '100vw', ...rest }) => {
  const fileExtensions = appConfig.imageBuildConfig.compressionTargets[image.format];

  // Fallback image src for legacy browsers that do not support webp:
  // https://caniuse.com/#search=webp
  const fallbackFileExtension = fileExtensions.filter(ext => ext !== 'webp')[0];
  const modernFileExtensions = fileExtensions.filter(ext => ext !== fallbackFileExtension);

  return (
    <Picture
      image={image}
      renditions={appConfig.imageRenditions}
      size={size}
      fallbackFileExtension={fallbackFileExtension}
      modernFileExtensions={modernFileExtensions}
      getImageSrc={getImageSrc}
      {...rest}
    />
  );
};

export default Image;
