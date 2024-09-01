// postcss.config.js
module.exports = {
    plugins: [
      require('autoprefixer'),
      require('postcss-preset-env')({
        stage: 0,
      }),
    ],
  };
  