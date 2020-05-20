const sharp = require('sharp');
const config = require('config');

const UPLOADS_FOLDER_PATH = config.get('UPLOADS_FOLDER_PATH');

const makeImagePoster = async filename => {
  const posterName = filename.replace(/.(png|jpg)$/, '_poster.png');
  const pathToOriginalImage = `${UPLOADS_FOLDER_PATH}${filename}`;
  const pathToResizedImage = `${UPLOADS_FOLDER_PATH}${posterName}`;

  await sharp(pathToOriginalImage)
    .resize(140)
    .toFile(pathToResizedImage);

  return posterName;
};

module.exports = makeImagePoster;
