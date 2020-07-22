import { useState } from 'react';
import Link from 'next/link';
import { splitArrayAlternating } from '../utils/arrays';
import { getImageRenditions } from '../io/config';
import { getImages, getProjects, getPortfolios } from '../io/content';
import Image from '../components/Image';
import ColumnLayout from '../components/ColumnLayout';
import Lightbox from '../components/Lightbox';

const THUMBNAIL_COLUMNS = 2;
const THUMBNAIL_PADDING = 1;

const ThumbnailButton = ({ image, imageRenditions, onClick }) => (
  <div className="Thumbnail mb2">
    <button
      title="View Image"
      type="button"
      className="button-reset bn pa0 db w-100 pointer"
      onClick={onClick}
    >
      <Image
        image={image}
        renditions={imageRenditions}
        size="50vw"
        className="w-100 db"
      />
    </button>
  </div>
);

const ThumbnailLink = ({ image, imageRenditions, href, as }) => (
  <div className="Thumbnail mb2">
    <Link
      href={href}
      as={as}
    >
      <a className="pa0 db w-100">
        <Image
          image={image}
          renditions={imageRenditions}
          size="50vw"
          className="w-100 db"
        />
      </a>
    </Link>
  </div>
);

const ThumbnailColumn = ({ items, images, projects, imageRenditions, setLightboxImage }) => (
  <div>
    {items.map((item, index) => {
      switch(item.type) {
        case 'image':
          if (!item.filename) {
            console.error(`Invalid data: item ${index} in column has type 'image' but does not have a filename property`);
            return null;
          }

          const image = images.find(data => data.filename === item.filename);

          if (!image) {
            console.error(`Missing image data for ${item.filename}`);
            return null;
          }

          return (
            <ThumbnailButton
              key={image.filename}
              image={image}
              imageRenditions={imageRenditions}
              onClick={() => setLightboxImage(image)}
            />
          );
        case 'project':
          if (!item.slug) {
            console.error(`Invalid data: item ${index} in column has type 'project' but does not have a slug property`);
            return null;
          }

          const project = projects.find(data => data.slug === item.slug);

          if (!project) {
            console.error(`Missing project data for ${item.slug}`);
            return null;
          }

          if (!project.thumbnailImage) {
            console.error(`Invalid data: project ${project.slug} does not have a thumbnailImage property`)
            return null;
          }

          if (!project.thumbnailImage.filename) {
            console.error(`Invalid data: project ${project.slug} thumbnailImage does not have a filename property`)
            return null;
          }

          const thumbnailImage = images.find(data => data.filename === project.thumbnailImage.filename);

          if (!thumbnailImage) {
            console.error(`Missing image data for ${project.thumbnailImage.filename}`);
            return null;
          }

          return (
            <ThumbnailLink
              key={project.slug}
              image={thumbnailImage}
              imageRenditions={imageRenditions}
              href="/project/[slug]"
              as={`/project/${project.slug}`}
            />
          );
        default:
          console.error(`Invalid images data: item ${index} in column did not have a recognised type`);
          return null;
      }
    })}
  </div>
);

const Portfolio = ({ data: { items, images, projects }, config: { imageRenditions } }) => {
  const [lightboxImage, setLightboxImage] = useState(null);

  const isLightboxOpen = !!lightboxImage;

  const itemColumns = splitArrayAlternating(items, THUMBNAIL_COLUMNS);

  return (
    <main>
      <ColumnLayout
        columns={THUMBNAIL_COLUMNS}
        verticalPadding={THUMBNAIL_PADDING}
        horizontalPadding={THUMBNAIL_PADDING}
      >
        {itemColumns.map((items, i) => (
          <ThumbnailColumn
            key={i}
            items={items}
            images={images}
            projects={projects}
            imageRenditions={imageRenditions}
            setLightboxImage={setLightboxImage}
          />
        ))}
      </ColumnLayout>
      <Lightbox
        isOpen={isLightboxOpen}
        image={lightboxImage}
        imageRenditions={imageRenditions}
        onClose={() => setLightboxImage(null)}
      />
    </main>
  );
};

export const getStaticProps = async ({ params }) => {
  const imageRenditions = await getImageRenditions();
  const portfolios = await getPortfolios();
  const projects = await getProjects();
  const images = await getImages();

  const { items } = portfolios.find(data => data.slug === params.slug);

  return {
    props: {
      config: {
        imageRenditions,
      },
      data: {
        items,
        projects,
        images,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const portfolios = await getPortfolios();

  const paths = portfolios.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default Portfolio;
