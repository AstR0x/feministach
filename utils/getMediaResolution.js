const ffmpeg = require('fluent-ffmpeg');

const { createPathsToFiles } = require('./createPathsToFiles');

const getMediaResolution = filename => new Promise((resolve, reject) => {
  const { pathToOriginalFile } = createPathsToFiles(filename);

  ffmpeg.ffprobe(pathToOriginalFile, (err, metadata) => {
    if (err) {
      reject(err);
    }

    const { width, height } = metadata.streams[0];

    resolve({
      width,
      height,
    });
  });
});

module.exports = getMediaResolution;
