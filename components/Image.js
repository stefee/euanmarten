import React from 'react';
import getSizes from '@renditions/get-img-sizes';
import { getImageSrc } from '../utils/images';

const getSrcset = (renditions, srcs) => srcs
    .map((src, i) => `${src} ${renditions[i].width}w`)
    .join(',');

const Image = ({ image, renditions, viewportWidth = 100, ...rest }) => {
  const sortedRenditions = renditions.sort((a, b) => a.width > b.width);

  const renditionSrcs = sortedRenditions
    .map(rendition => getImageSrc(image, rendition));

  const renditionSrcset = getSrcset(sortedRenditions, renditionSrcs);

  const sizes = getSizes({
    defaultImageWidth: `${viewportWidth}vw`,
    breakpoints: [
      {
        viewportMinWidth: '960px'
      },
      {
        viewportMinWidth: '480px'
      }
    ]
  });

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
