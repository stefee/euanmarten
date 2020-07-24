import { useEffect, useRef } from 'react';
import Icon from './Icon';
import Image from './Image';

const LightboxOverlay = ({ image, appConfig, onClose }) => {
  const closeButtonRef = useRef(null);
  const returnFocusRef = useRef(null);

  const close = () => {
    if (returnFocusRef.current) {
      returnFocusRef.current.focus();
    }
    onClose();
  };

  // close lightbox on escape key
  useEffect(() => {
    const escapeKeyHandler = event => {
      if (event.keyCode === 27) { // escape
        close();
      }
    };
    window.addEventListener('keydown', escapeKeyHandler);
    return () => window.removeEventListener('keydown', escapeKeyHandler);
  });

  // focus close button and return focus after closing
  useEffect(() => {
    returnFocusRef.current = window.document.activeElement;
    closeButtonRef.current.focus();
  });

  return (
    <div className="Lightbox fixed absolute--fill bg-near-black pt5 pb5 pt4-l pb4-l pr5-l pl5-l">
      <Image image={image} appConfig={appConfig} size="100vw" />
      <button
        title="Close"
        type="button"
        className="Lightbox-CloseButton button-reset bg-transparent bn db pointer pa3 absolute top-0 right-0 right-1-ns"
        onClick={e => {
          e.preventDefault();
          close();
        }}
        ref={closeButtonRef}
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
