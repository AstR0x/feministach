const ffmpeg = require('fluent-ffmpeg');
const config = require('config');

const UPLOADS_FOLDER_PATH = config.get('UPLOADS_FOLDER_PATH');

const { createPathsToFiles, createFilename } = require('./createPathsToFiles');

const makeVideoPoster = filename => new Promise(resolve => {
  const { pathToOriginalFile: pathToVideo } = createPathsToFiles(filename);

  ffmpeg(pathToVideo)
    .screenshots({
      folder: UPLOADS_FOLDER_PATH,
      timestamps: ['5%'],
      filename: '%b_poster.png',
      size: '?x140',
    })
    .on('end', () => {
      const posterName = createFilename(filename, '__poster', false);

      resolve(posterName);
    });
});

module.exports = makeVideoPoster;
