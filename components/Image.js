import Img from '@renditions/react-img';
import Source from '@renditions/react-picture-source';
import { getImageSrc } from '../utils/images';

const Picture = ({
  image,
  renditions,
  size = null,
  fallbackFileExtension,
  modernFileExtensions,
  getImageSrc,
  ...rest
}) => (
  <picture>
    {modernFileExtensions.map(fileExtension => (
      <Source
        key={fileExtension}
        type={`image/${fileExtension}`}
        getSrc={getImageSrc.bind(null, image, fileExtension)}
        renditions={renditions}
        size={size}
        autoSortRenditions
      />
    ))}
    <Img
      alt={image.altText}
      width={image.width}
      height={image.height}
      getSrc={getImageSrc.bind(null, image, fallbackFileExtension)}
      renditions={renditions}
      size={size}
      autoSortRenditions
      {...rest}
    />
  </picture>
);

const Image = ({ image, appConfig, size = null, ...rest }) => {
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
