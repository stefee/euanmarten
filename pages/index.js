import React, { useState, useEffect } from 'react';
import 'tachyons';
import '../style.css';
import { classNames } from '../utils/classNames';
import { splitArrayAlternating } from '../utils/arrays';
import { getImageSrc } from '../utils/images';
import Image from '../components/Image';
import Nav from '../components/Nav';
import ColumnLayout from '../components/ColumnLayout';
import Lightbox from '../components/Lightbox';

const COLUMNS = 2;

// TODO: add srcset support
const IMAGE_WIDTH = 1280;

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

const Home = ({ env }) => {
  const { images } = env.IMAGES;

  const [lightboxImage, setLightboxImage] = useState(null);

  const isLightboxOpen = !!lightboxImage;

  const imageColumns = splitArrayAlternating(images, COLUMNS);

  return (
    <div className="sans-serif overflow-x-hidden">
      <div className="pa4">
        <Nav />
      </div>
      <main>
        <ColumnLayout columns={COLUMNS}>
          {imageColumns.map(images => (
            <ThumbnailColumn
              images={images}
              setLightboxImage={setLightboxImage}
            />
          ))}
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
