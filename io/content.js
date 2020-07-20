import { promises as fs } from 'fs';

export const getContent = async () => {
  const content = JSON.parse(await fs.readFile('./content.json', { encoding: 'utf8' }));;
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
