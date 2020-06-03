const fs = require('fs');
const sharp = require('sharp');

const { createPathsToFiles } = require('./createPathsToFiles');

const rotateImage = async filename => {
  const {
    pathToOriginalFile: pathToImage,
    pathToTempFile: pathToTempImage,
  } = createPathsToFiles(filename);

  await sharp(pathToImage)
    .rotate()
    .toFile(pathToTempImage);

  fs.unlinkSync(pathToImage);
  fs.renameSync(pathToTempImage, pathToImage);
};

module.exports = rotateImage;
