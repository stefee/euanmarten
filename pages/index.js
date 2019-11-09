import React, { useState } from 'react';
import Link from 'next/link';
import { splitArrayAlternating } from '../utils/arrays';
import Image from '../components/Image';
import ColumnLayout from '../components/ColumnLayout';
import Lightbox from '../components/Lightbox';

const THUMBNAIL_COLUMNS = 2;
const THUMBNAIL_PADDING = 1;

const findImageByFilename = (images, filename) => images.find(i => i.filename === filename);

const ThumbnailButton = ({ image, renditions, onClick }) => (
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

const ThumbnailLink = ({ image, renditions, href, as }) => (
  <div className="Thumbnail mb2">
    <Link
      href={href}
      as={as}
    >
      <a className="pa0 db w-100">
        <Image image={image} renditions={renditions} width="50vw" className="w-100 db" />
      </a>
    </Link>
  </div>
);

const ThumbnailColumn = ({ items, images, renditions, setLightboxImage }) => (
  <div>
    {items.map(item => {
      switch (item.type) {
        case "image":
          const image = findImageByFilename(images, item.filename);
          return (
            <ThumbnailButton
              key={image.filename}
              image={image}
              renditions={renditions}
              onClick={() => setLightboxImage(image)}
            />
          );
        case "gallery":
          const href = `/gallery/${item.slug}`;
          return (
            <ThumbnailLink
              key={href}
              image={{ filename: "oranges.jpg" }} // @FIXME
              renditions={renditions}
              href="/gallery/[slug]"
              as={href}
            />
          );
      }
    })}
  </div>
);

const Home = ({ env }) => {
  const { index, images, renditions } = env.IMAGES;

  const [lightboxImage, setLightboxImage] = useState(null);

  const isLightboxOpen = !!lightboxImage;

  const indexColumns = splitArrayAlternating(index, THUMBNAIL_COLUMNS);

  return (
    <main>
      <ColumnLayout
        columns={THUMBNAIL_COLUMNS}
        verticalPadding={THUMBNAIL_PADDING}
        horizontalPadding={THUMBNAIL_PADDING}
      >
        {indexColumns.map((items, i) => (
          <ThumbnailColumn
            key={i}
            items={items}
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
