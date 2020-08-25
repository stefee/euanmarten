import { promises as fs } from 'fs';
import JSON5 from 'json5';

export const getContent = async () => {
  const content = JSON5.parse(await fs.readFile('./content.json5', { encoding: 'utf8' }));
  return content;
};

export const getImageMetadata = async () => {
  const { imageMetadata } = JSON.parse(await fs.readFile('./dist/static/images-dist/metadata.json', { encoding: 'utf8' }));
  return imageMetadata;
};

export const getImages = async () => {
  const { images } = await getContent();
  const imageMetadata = await getImageMetadata();

  const imagesWithMetadata = images.reduce((acc, data) => {
    const metadata = imageMetadata.find(metadata => metadata.filename === data.filename);

    if (!metadata) {
      console.error(`Missing metadata for image ${data.filename}. Check that the image exists in the image build output directory.`);
      return acc;
    }

    acc.push({ ...data, ...metadata });
    return acc;
  }, []);

  return imagesWithMetadata;
};

export const getProjects = async () => {
  const { projects } = await getContent();
  return projects;
};

export const getPortfolios = async () => {
  const { portfolios } = await getContent();
  return portfolios;
};
