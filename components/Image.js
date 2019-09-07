import React from 'react';
import { getImageSrc } from '../utils/images';

const BREAKPOINTS = [960, 480];

const getSizes = (breakpoints, viewportWidth) => {
  const sizes = breakpoints.map(width => `(min-width: ${width}px) ${viewportWidth}vw`);
  sizes.push(`${viewportWidth}vw`);
  return sizes.join(',');
};

const getSrcset = (renditions, srcs) => srcs
    .map((src, i) => `${src} ${renditions[i].width}w`)
    .join(',');

const Image = ({ image, renditions, viewportWidth = 100, ...rest }) => {
  const sortedRenditions = renditions.sort((a, b) => a.width > b.width);

  const renditionSrcs = sortedRenditions
    .map(rendition => getImageSrc(image, rendition));

  const renditionSrcset = getSrcset(sortedRenditions, renditionSrcs);

  const sizes = getSizes(BREAKPOINTS, viewportWidth);

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
