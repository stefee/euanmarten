const withCSS = require('@zeit/next-css');

const IMAGES = [
  'growing2.png',
  'point.jpg',
  'oranges.jpg',
  'body.jpg',
  'self.jpg',
  'bilbo2.png',
  'owl.jpg',
  'peel.jpg',
  'sword.jpg'
];

module.exports = withCSS({
  webpack: (config, { webpack }) => {
    const definePlugin = new webpack.DefinePlugin({
      'process.env': {
        IMAGES: JSON.stringify(IMAGES)
      }
    });

    config.plugins.push(definePlugin);

    return config;
  }
});
