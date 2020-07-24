import { promises as fs } from 'fs';

export const getAppConfig = async () => {
  const config = JSON.parse(await fs.readFile('./config.json', { encoding: 'utf8' }));
  return config;
};
