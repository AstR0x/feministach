const sharp = require('sharp');

const { createPathsToFiles, createFilename } = require('./createPathsToFiles');

const makeImagePoster = async filename => {
  const { pathToOriginalFile, pathToPoster } = createPathsToFiles(filename);

  await sharp(pathToOriginalFile)
    .resize({ height: 140 })
    .toFile(pathToPoster);

  return createFilename(filename, '__poster', false);
};

module.exports = makeImagePoster;
