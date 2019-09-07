import React, { useState } from 'react';
import { splitArrayAlternating } from '../utils/arrays';
import Image from '../components/Image';
import ColumnLayout from '../components/ColumnLayout';
import Lightbox from '../components/Lightbox';

const THUMBNAIL_COLUMNS = 2;
const THUMBNAIL_PADDING = 1;

const Thumbnail = ({ image, renditions, onClick }) => (
  <div className="Thumbnail mb2">
    <button
      title="View Image"
      type="button"
      className="button-reset bn pa0 db w-100 pointer"
      onClick={onClick}
    >
      <Image image={image} renditions={renditions} width="50vw" className="w-100 db" />
    </button>
  </div>
);

const ThumbnailColumn = ({ images, renditions, setLightboxImage }) => (
  <div>
    {images.map(image => (
      <Thumbnail
        key={image.filename}
        image={image}
        renditions={renditions}
        onClick={() => setLightboxImage(image)}
      />
    ))}
  </div>
);

const Home = ({ env }) => {
  const { images, renditions } = env.IMAGES;

  const [lightboxImage, setLightboxImage] = useState(null);

  const isLightboxOpen = !!lightboxImage;

  const imageColumns = splitArrayAlternating(images, THUMBNAIL_COLUMNS);

  return (
    <main>
      <ColumnLayout
        columns={THUMBNAIL_COLUMNS}
        verticalPadding={THUMBNAIL_PADDING}
        horizontalPadding={THUMBNAIL_PADDING}
      >
        {imageColumns.map((images, i) => (
          <ThumbnailColumn
            key={i}
            images={images}
            renditions={renditions}
            setLightboxImage={setLightboxImage}
          />
        ))}
      </ColumnLayout>
      <Lightbox
        isOpen={isLightboxOpen}
        image={lightboxImage}
        renditions={renditions}
        onClose={() => setLightboxImage(null)}
      />
    </main>
  );
};

export default Home;
