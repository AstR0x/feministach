const ffmpeg = require('fluent-ffmpeg');
const config = require('config');

const UPLOADS_FOLDER_PATH = config.get('UPLOADS_FOLDER_PATH');

const getMediaInfo = filename => new Promise((resolve, reject) => {
  ffmpeg.ffprobe(`${UPLOADS_FOLDER_PATH}${filename}`, (err, metadata) => {
    if (err) {
      reject(err);
    }

    const stream = metadata.streams.find(item => item.width);

    const width = stream.width;
    const height = stream.height;

    resolve({
      width,
      height,
    });
  });
});

module.exports = getMediaInfo;
