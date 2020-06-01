const fs = require('fs');

const createNewFilename = (filename, addition) => {
  return `${path.basename(filename, path.extname(filename))}${addition}.png`;
};


const tempImageName = createNewFilename(filename, '__temp');
// Понадобился промежуточный файл,
// так как перезапись сразу в оригинальный файл не поправила перевёрнутость
const pathToTempFile = `${UPLOADS_FOLDER_PATH}${tempImageName}`;

const meta = await sharp(pathToOriginalImage).metadata();

// Таким образом исправляю перевёрнутость изображений в 4к, загруженных с телефона
if (meta.width === 3840 && meta.height === 2160) {
  await sharp(pathToOriginalImage)
    .rotate()
    .toFile(pathToTempFile);

  fs.unlinkSync(pathToOriginalImage);
  fs.renameSync(pathToTempFile, pathToOriginalImage);
