const ffmpeg = require('fluent-ffmpeg');
const config = require('config');

const UPLOADS_FOLDER_PATH = config.get('UPLOADS_FOLDER_PATH');

const takeScreenshot = filename => new Promise(resolve => {
  ffmpeg(`${UPLOADS_FOLDER_PATH}${filename}`)
    .screenshots({
      timestamps: ['5%'],
      folder: UPLOADS_FOLDER_PATH,
      filename: '%b.png',
      size: '25%',
    })
    .on('end', () => {
      const posterName = `${filename.split('.')[0]}.png`;

      resolve(posterName);
    });
});

module.exports = takeScreenshot;
