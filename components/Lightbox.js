import React, { useEffect } from 'react';
import { getImageSrc } from '../utils/images';
import Icon from './Icon';
import Image from './Image';

// TODO: add srcset support
const IMAGE_WIDTH = 1280;

const LightboxOverlay = ({ image, onClose }) => {
  useEffect(() => {
    const escapeKeyHandler = event => {
      if (event.keyCode === 27) { // escape
        onClose();
      }
    };
    window.addEventListener('keydown', escapeKeyHandler);
    return () => window.removeEventListener('keydown', escapeKeyHandler);
  })

  const src = getImageSrc(image, { width: IMAGE_WIDTH });

  return (
    <div className="Lightbox fixed absolute--fill bg-near-black pt5 pb5 pt4-l pb4-l pr5-l pl5-l">
      <Image src={src} image={image} />
      <button
        title="Close"
        type="button"
        className="Lightbox-CloseButton button-reset bg-transparent bn db pointer pa3 absolute top-0 right-0 right-1-ns"
        onClick={e => {
          e.preventDefault();
          onClose();
        }}
      >
        <Icon name="CLOSE" className="white" />
      </button>
    </div>
  );
};

const Lightbox = ({ isOpen, image, ...rest }) => {
  if(isOpen && image) {
    return <LightboxOverlay image={image} {...rest} />;
  } else {
    return null;
  }
};

export default Lightbox;
