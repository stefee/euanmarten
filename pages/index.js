import React, { useState, useEffect } from 'react';
import 'tachyons';
import '../style.css';
import { classNames } from '../utils/classNames';
import { splitArrayAlternating } from '../utils/arrays';
import { getImageSrc } from '../utils/images';
import Icon from '../components/Icon';
import Nav from '../components/Nav';
import ColumnLayout from '../components/ColumnLayout';

// TODO: add srcset support
const IMAGE_WIDTH = 1280;

const Image = ({ src, image: { altText }, ...rest }) => (
  <img src={src} alt={altText} {...rest} />
);

const Thumbnail = ({ image, onClick }) => {
  const src = getImageSrc(image, { width: IMAGE_WIDTH });

  return (
    <div className="mb2">
      <button
        title="View Image"
        type="button"
        className="button-reset bn pa0 db w-100 pointer"
        onClick={onClick}
      >
        <Image src={src} image={image} className="w-100 db" />
      </button>
    </div>
  );
};

const ThumbnailColumn = ({ images, className, setLightboxImage }) => (
  <div className={className}>
    {images.map(image => (
      <Thumbnail
        key={image.filename}
        image={image}
        onClick={() => setLightboxImage(image)}
      />
    ))}
  </div>
);

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

const Home = ({ env }) => {
  const { images } = env.IMAGES;

  const [lightboxImage, setLightboxImage] = useState(null);

  const isLightboxOpen = !!lightboxImage;

  const [firstColumnImages, secondColumnImages] = splitArrayAlternating(images, 2);

  return (
    <div className="sans-serif overflow-hidden">
      <div className="pa4">
        <Nav />
      </div>
      <main>
        <ColumnLayout columns={2}>
          <ThumbnailColumn
            images={firstColumnImages}
            setLightboxImage={setLightboxImage}
          />
          <ThumbnailColumn
            images={secondColumnImages}
            setLightboxImage={setLightboxImage}
          />
        </ColumnLayout>
      </main>
      <Lightbox
        isOpen={isLightboxOpen}
        image={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </div>
  );
};

export default Home;
