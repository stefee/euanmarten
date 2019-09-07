import React from 'react';
import { getImageSrc } from '../utils/images';

const BREAKPOINTS = [960, 480];

const getSizes = breakpoints => {
  const sizes = breakpoints.map(width => `(min-width: ${width}px) 100vw`);
  sizes.push('100vw');
  return sizes.join(',');
};

const getSrcset = (renditions, srcs) => srcs
    .map((src, i) => `${src} ${renditions[i].width}w`)
    .join(',')

const Image = ({ image, renditions, ...rest }) => {
  const sortedRenditions = renditions.sort((a, b) => a.width > b.width);

  const renditionSrcs = sortedRenditions
    .map(rendition => getImageSrc(image, rendition));

  const renditionSrcset = getSrcset(sortedRenditions, renditionSrcs);

  const sizes = getSizes(BREAKPOINTS);

  return (
    <img
      src={renditionSrcs[0]}
      srcSet={renditionSrcset}
      sizes={sizes}
      alt={image.altText}
      {...rest}
    />
  );
};

export default Image;
