import React, { useState } from 'react';
import { splitArrayAlternating } from '../utils/arrays';
import { getImageSrc } from '../utils/images';
import Image from '../components/Image';
import ColumnLayout from '../components/ColumnLayout';
import Lightbox from '../components/Lightbox';

const THUMBNAIL_COLUMNS = 2;
const IMAGE_WIDTH = 1280; // TODO: add srcset support

const Thumbnail = ({ image, onClick }) => {
  const src = getImageSrc(image);

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

const ThumbnailColumn = ({ images, setLightboxImage }) => (
  <div>
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

  const imageColumns = splitArrayAlternating(images, THUMBNAIL_COLUMNS);

  return (
    <main>
      <ColumnLayout columns={THUMBNAIL_COLUMNS}>
        {imageColumns.map((images, i) => (
          <ThumbnailColumn
            key={i}
            images={images}
            setLightboxImage={setLightboxImage}
          />
        ))}
      </ColumnLayout>
      <Lightbox
        isOpen={isLightboxOpen}
        image={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </main>
  );
};

export default Home;
