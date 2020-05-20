const ffmpeg = require('fluent-ffmpeg');
const config = require('config');

const UPLOADS_FOLDER_PATH = config.get('UPLOADS_FOLDER_PATH');

const makeVideoPoster = filename => new Promise(resolve => {
  const pathToVideo = `${UPLOADS_FOLDER_PATH}${filename}`;

  ffmpeg(pathToVideo)
    .screenshots({
      folder: UPLOADS_FOLDER_PATH,
      timestamps: ['5%'],
      filename: '%b_poster.png',
      size: '140x?',
    })
    .on('end', () => {
      const posterName = filename.replace(/.(webm|mp4)$/, '_poster.png');

      resolve(posterName);
    });
});

module.exports = makeVideoPoster;
