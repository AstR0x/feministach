const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const config = require('config');

const UPLOADS_FOLDER_PATH = config.get('UPLOADS_FOLDER_PATH');

const createNewFilename = (filename, addition) => {
  return `${path.basename(filename, path.extname(filename))}${addition}.png`;
};

const makeImagePoster = async filename => {
  const posterName = createNewFilename(filename, '__poster');
  const resizedImageName = createNewFilename(filename, '__resized');

  const pathToOriginalImage = `${UPLOADS_FOLDER_PATH}${filename}`;
  const pathToPosterImage = `${UPLOADS_FOLDER_PATH}${posterName}`;

  // Понадобился промежуточный файл,
  // так как перезапись сразу в оригинальный файл не поправила перевёрнутость
  const pathToResizedImage = `${UPLOADS_FOLDER_PATH}${resizedImageName}`;

  const meta = await sharp(pathToOriginalImage).metadata();

  // Таким образом исправляю перевёрнутость изображений в 4к, загруженных с телефона
  if (meta.width > 1920) {
    await sharp(pathToOriginalImage)
      .resize({ width: 1920 })
      .rotate()
      .toFile(pathToResizedImage);

    fs.unlinkSync(pathToOriginalImage);
    fs.renameSync(pathToResizedImage, pathToOriginalImage);
  }

  await sharp(pathToOriginalImage)
    .resize({ height: 130 })
    .toFile(pathToPosterImage);

  return posterName;
};

module.exports = makeImagePoster;
