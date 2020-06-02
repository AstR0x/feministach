const fs = require('fs');
const sharp = require('sharp');

const { createPathsToFiles } = require('./createPathsToFiles');

const rotateImage = async filename => {
  const { pathToOriginalFile, pathToTempFile } = createPathsToFiles(filename);

  await sharp(pathToOriginalFile)
    .rotate()
    .toFile(pathToTempFile);

  fs.unlinkSync(pathToOriginalFile);
  fs.renameSync(pathToTempFile, pathToOriginalFile);
};

module.exports = rotateImage;
