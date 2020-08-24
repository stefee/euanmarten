import { useState } from 'react';
import { getAppConfig } from '../../io/config';
import { getImages, getProjects } from '../../io/content';
import Image from '../../components/Image';
import ColumnLayout from '../../components/ColumnLayout';
import Lightbox from '../../components/Lightbox';

const THUMBNAIL_COLUMNS = 1;
const THUMBNAIL_PADDING = 3;

const Thumbnail = ({ image, appConfig, onClick }) => (
  <div className="Thumbnail mb2">
    <button
      title="View Image"
      type="button"
      className="button-reset bn pa0 db w-100 pointer"
      onClick={onClick}
    >
      <Image image={image} appConfig={appConfig} size="100vw" className="w-100 db" />
    </button>
  </div>
);

const Project = ({ appConfig, data: { project, images } }) => {
  const [lightboxImage, setLightboxImage] = useState(null);

  const isLightboxOpen = !!lightboxImage;

  return (
    <main className="flex flex-wrap">
      <div className="ph4 pt4 w-third-l">
        <div className="sticky-l top-2">
          <h2 className="mt0 fw2">{project.title}</h2>
          <p>{project.introText}</p>
        </div>
      </div>
      <div className="w-two-thirds-l">
        <ColumnLayout
          columns={THUMBNAIL_COLUMNS}
          verticalPadding={THUMBNAIL_PADDING}
          horizontalPadding={THUMBNAIL_PADDING}
        >
          <div>
            {project.items.map((item, index) => {
              // @FIXME: for now we assume that projects only contain images,
              // but in future we might want to support other types
              const image = images.find(data => data.filename === item.filename);

              return (
                <figure key={index} className="ma0 mb4">
                  <Thumbnail
                    key={image.filename}
                    image={image}
                    appConfig={appConfig}
                    onClick={() => setLightboxImage(image)}
                  />
                  {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                </figure>
              );
            })}
          </div>
        </ColumnLayout>
      </div>
      <Lightbox
        isOpen={isLightboxOpen}
        image={lightboxImage}
        appConfig={appConfig}
        onClose={() => setLightboxImage(null)}
      />
    </main>
  );
};

export const getStaticProps = async ({ params }) => {
  const appConfig = await getAppConfig()
  const projects = await getProjects();
  const images = await getImages();

  const project = projects.find(data => data.slug === params.slug);

  return {
    props: {
      appConfig,
      data: {
        project,
        images,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const projects = await getProjects();

  const paths = projects.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default Project;
