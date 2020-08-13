import Img from '@renditions/react-img';
import Source from '@renditions/react-picture-source';

const Picture = ({
  image,
  renditions,
  size = '100vw',
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

export default Picture;
