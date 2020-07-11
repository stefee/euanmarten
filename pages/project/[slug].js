import { useState } from 'react';
import { promises as fs } from 'fs';
import Error from 'next/error';
import Image from '../../components/Image';
import ColumnLayout from '../../components/ColumnLayout';
import Lightbox from '../../components/Lightbox';

const THUMBNAIL_COLUMNS = 1;
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

const Project = ({ data: { project, images, renditions } }) => {
  const [lightboxImage, setLightboxImage] = useState(null);

  const isLightboxOpen = !!lightboxImage;

  if (project) {
    // @FIXME: for now we assume that projects only contain images,
    // but in future we might want to support other types
    const imageColumn = project.items.map(item => images.find(data => data.filename === item.filename));

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

  const { projects, images, renditions } = parsedImagesData;

  const project = projects.find(data => data.slug === params.slug);

  return {
    props: {
      data: {
        project,
        images,
        renditions,
      }
    }
  };
};

export const getStaticPaths = async () => {
  const imagesData = await fs.readFile('./images.json', { encoding: 'utf-8' });
  const parsedImagesData = JSON.parse(imagesData);

  const paths = parsedImagesData.projects.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: false
  };
};

export default Project;
