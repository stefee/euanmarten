import { promises as fs } from 'fs';

export const getConfig = async () => {
  const config = JSON.parse(await fs.readFile('./config.json', { encoding: 'utf8' }));
  return config;
};

export const getImageRenditions = async () => {
  const { imageRenditions } = await getConfig();
  return imageRenditions;
};
