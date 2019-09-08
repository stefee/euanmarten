import React from 'react';
import Img from '@renditions/react-img';
import { getImageSrc } from '../utils/images';

const Image = ({ image, renditions, width = '100vw', ...rest }) => (
  <Img
    alt={image.altText}
    getSrc={getImageSrc.bind(null, image)}
    renditions={renditions}
    width={width}
    {...rest}
  />
);

export default Image;
