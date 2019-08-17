const fs = require('fs');
const withCSS = require('@zeit/next-css');

const IMAGES = fs.readFileSync('./images.json', { encoding: 'utf-8' });

module.exports = withCSS({
  webpack: (config, { webpack }) => {
    const definePlugin = new webpack.DefinePlugin({
      'process.env': {
        IMAGES
      }
    });

    config.plugins.push(definePlugin);

    return config;
  }
});
