import { useState } from 'react';
import { promises as fs } from 'fs';
import Error from 'next/error';
import Image from '../../components/Image';
import ColumnLayout from '../../components/ColumnLayout';
import Lightbox from '../../components/Lightbox';

const THUMBNAIL_COLUMNS = 1;
const THUMBNAIL_PADDING = 1;

const findImageByFilename = (images, filename) => images.find(data => data.filename === filename);

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

const Gallery = ({ data: { gallery, images, renditions } }) => {
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

export const getStaticProps = async ({ params }) => {
  const imagesData = await fs.readFile('./images.json', { encoding: 'utf-8' });
  const parsedImagesData = JSON.parse(imagesData);

  const { galleries, images, renditions } = parsedImagesData;

  const gallery = galleries.find(data => data.slug === params.slug);

  return {
    props: {
      data: {
        gallery,
        images,
        renditions,
      }
    }
  };
};

export const getStaticPaths = async () => {
  const imagesData = await fs.readFile('./images.json', { encoding: 'utf-8' });
  const parsedImagesData = JSON.parse(imagesData);

  const paths = parsedImagesData.galleries.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: false
  };
};

export default Gallery;
