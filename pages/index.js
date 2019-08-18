import React, { useState, useEffect } from 'react';
import 'tachyons';
import '../style.css';
import { getImageSrc } from '../utils/images';
import Icon from '../components/Icon';
import Nav from '../components/Nav';

// TODO: add srcset support
const IMAGE_WIDTH = 1280;

const Image = ({ src, image: { altText }, ...rest }) => <img src={src} alt={altText} {...rest} />;

const Thumbnail = ({ image, onClick }) => {
  const src = getImageSrc(image, { width: IMAGE_WIDTH });

  return (
    <div className="mb1 mb2-ns">
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
  <div className={`ThumbnailColumn ${className}`}>
    {images.map(image => (
      <Thumbnail
        key={image.filename}
        image={image}
        onClick={() => setLightboxImage(image)}
      />
    ))}
  </div>
);

const TwoColumnLayout = ({ images, ...rest }) => {
  const firstColumnImages = [];
  const secondColumnImages = [];

  images.forEach((image, i) => {
    const isEven = i % 2 === 0;
    if (isEven) {
      firstColumnImages.push(image);
    } else {
      secondColumnImages.push(image);
    }
  });

  return (
    <div className="flex flex-row">
      <ThumbnailColumn
        images={firstColumnImages}
        className="w-50 pa1 pa2-ns"
        {...rest}
      />
      <ThumbnailColumn
        images={secondColumnImages}
        className="w-50 pa1 pa2-ns pl0 pl0-ns"
        {...rest}
      />
    </div>
  );
};

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

  return (
    <div className="sans-serif">
      <div className="pa4">
        <Nav />
      </div>
      <main>
        <TwoColumnLayout
          images={images}
          setLightboxImage={setLightboxImage}
        />
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
