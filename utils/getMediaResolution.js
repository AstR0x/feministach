const ffmpeg = require('fluent-ffmpeg');

const { createPathsToFiles } = require('./createPathsToFiles');

const getMediaResolution = filename => new Promise((resolve, reject) => {
  const pathToOriginalFile = createPathsToFiles(filename).pathToOriginalFile;

  ffmpeg.ffprobe(pathToOriginalFile, (err, metadata) => {
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

module.exports = getMediaResolution;
