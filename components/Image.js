import React from 'react';

const Image = ({ src, image: { altText }, ...rest }) => (
  <img src={src} alt={altText} {...rest} />
);

export default Image;
