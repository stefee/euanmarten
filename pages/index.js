import React, { useState, useEffect } from 'react';
import 'tachyons';
import '../style.css';
import Icon from '../components/Icon';
import Nav from '../components/Nav';

const IMAGES = [
  'growing2.png',
  'point.jpg',
  'oranges.jpg',
  'body.jpg',
  'self.jpg',
  'bilbo2.png',
  'owl.jpg',
  'peel.jpg',
  'sword.jpg'
];

const getImageSrc = filename => `/images/${filename}`;

const Image = ({ image: { src, altText = '' }, ...rest }) => <img src={src} alt={altText} {...rest} />;

const Thumbnail = ({ imageFilename, onClick }) => {
  const src = getImageSrc(imageFilename);

  return (
    <div className="mb1 mb2-ns">
      <button
        className="button-reset bn pa0 db w-100 pointer"
        onClick={onClick}
      >
        <Image image={{ src }} className="w-100 db" />
      </button>
    </div>
  );
};

const ThumbnailColumn = ({ images, className, setLightboxImage }) => (
  <div className={`ThumbnailColumn ${className}`}>
    {images.map(filename => (
      <Thumbnail
        key={filename}
        imageFilename={filename}
        onClick={() => setLightboxImage(filename)}
      />
    ))}
  </div>
);

const TwoColumnLayout = ({ images, setLightboxImage }) => {
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
        setLightboxImage={setLightboxImage}
      />
      <ThumbnailColumn
        images={secondColumnImages}
        className="w-50 pa1 pa2-ns pl0 pl0-ns"
        setLightboxImage={setLightboxImage}
      />
    </div>
  );
};

const LightboxOverlay = ({ src, onClose }) => {
  useEffect(() => {
    const escapeKeyHandler = event => {
      if (event.keyCode === 27) { // escape
        onClose();
      }
    };
    window.addEventListener('keydown', escapeKeyHandler);
    return () => window.removeEventListener('keydown', escapeKeyHandler);
  })

  return (
    <div className="Lightbox fixed absolute--fill bg-near-black pt5 pb5 pt4-l pb4-l pr5-l pl5-l">
      <Image image={{ src }} />
      <button
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

const Lightbox = ({ isOpen, imageFilename, ...rest }) => {
  if(isOpen && imageFilename) {
    const src = getImageSrc(imageFilename);
    return <LightboxOverlay src={src} {...rest} />;
  } else {
    return null;
  }
};

const Home = () => {
  const [lightboxImage, setLightboxImage] = useState(null);

  const isLightboxOpen = !!lightboxImage;

  return (
    <div className="sans-serif">
      <div className="pa4">
        <Nav />
      </div>
      <main>
        <TwoColumnLayout
          images={IMAGES}
          setLightboxImage={setLightboxImage}
        />
      </main>
      <Lightbox
        isOpen={isLightboxOpen}
        imageFilename={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </div>
  );
};

export default Home;
