import Img from '@renditions/react-img';
import Source from '@renditions/react-picture-source';
import { getImageSrc } from '../utils/images';

const Image = ({ image, appConfig, size = '100vw', ...rest }) => {
  const fileExtensions = appConfig.imageBuildConfig.compressionTargets[image.format];

  // Fallback image src for legacy browsers that do not support webp:
  // https://caniuse.com/#search=webp
  const fallbackFileExtension = fileExtensions.filter(ext => ext !== 'webp')[0];
  const modernFileExtensions = fileExtensions.filter(ext => ext !== fallbackFileExtension);

  return (
    <picture>
      {modernFileExtensions.map(fileExtension => (
        <Source
          key={fileExtension}
          type={`image/${fileExtension}`}
          getSrc={getImageSrc.bind(null, image, fileExtension)}
          renditions={appConfig.imageRenditions}
          size={size}
          autoSortRenditions
        />
      ))}
      <Img
        alt={image.altText}
        width={image.width}
        height={image.height}
        getSrc={getImageSrc.bind(null, image, fallbackFileExtension)}
        renditions={appConfig.imageRenditions}
        size={size}
        autoSortRenditions
        {...rest}
      />
    </picture>
  );
};

export default Image;
