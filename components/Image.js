import React from 'react';
import getSizes from '@renditions/get-sizes';
import getSrcset, { sortRenditions } from '@renditions/get-srcset';
import { getImageSrc } from '../utils/images';

const Image = ({ image, renditions, width = '100vw', ...rest }) => {
  const sortedRenditions = sortRenditions([...renditions]);

  const renditionsWithSrc = sortedRenditions.map(rendition => ({
    ...rendition,
    src: getImageSrc(image, rendition)
  }));

  const imageProps = {
    src: getImageSrc(image, sortedRenditions[0]),
    srcSet: getSrcset(renditionsWithSrc),
    sizes: getSizes({ width })
  };

  return (
    <img
      alt={image.altText}
      {...imageProps}
      {...rest}
    />
  );
};

export default Image;
