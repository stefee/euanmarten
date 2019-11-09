import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Error from 'next/error';
import Image from '../../components/Image';
import ColumnLayout from '../../components/ColumnLayout';
import Lightbox from '../../components/Lightbox';

const THUMBNAIL_COLUMNS = 1;
const THUMBNAIL_PADDING = 1;

const findGalleryBySlug = (galleries, slug) => galleries.find(g => g.slug === slug);

const findImageByFilename = (images, filename) => images.find(i => i.filename === filename);

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

const Gallery = ({ env }) => {
  const router = useRouter();
  const { slug } = router.query;

  const { galleries, images, renditions } = env.IMAGES;

  const gallery = findGalleryBySlug(galleries, slug);

  const [lightboxImage, setLightboxImage] = useState(null);

  const isLightboxOpen = !!lightboxImage;

  if (gallery) {
    const imageColumn = gallery.slides.map(findImageByFilename.bind(null, images));

    return (
      <main>
        <ColumnLayout
          columns={THUMBNAIL_COLUMNS}
          verticalPadding={THUMBNAIL_PADDING}
          horizontalPadding={THUMBNAIL_PADDING}
        >
          <div>
            {imageColumn.map(image => (
              <Thumbnail
                key={image.filename}
                image={image}
                renditions={renditions}
                onClick={() => setLightboxImage(image)}
              />
            ))}
          </div>
        </ColumnLayout>
        <Lightbox
          isOpen={isLightboxOpen}
          image={lightboxImage}
          renditions={renditions}
          onClose={() => setLightboxImage(null)}
        />
      </main>
    );
  } else {
    return <Error statusCode={404} />;
  }
};

Gallery.getInitialProps = async () => ({});

export default Gallery;
