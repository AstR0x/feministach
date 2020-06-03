const config = require('config');

const rotateImage = require('./rotateImage');
const getMediaResolution = require('./getMediaResolution');
const makeImagePoster = require('./makeImagePoster');
const makeVideoPoster = require('./makeVideoPoster');

const SERVER_URL = config.get('SERVER_URL');
const SERVER_FILES_PATH = config.get('SERVER_FILES_PATH');

const getAttachedFilesInfo = async files => {
  const promises = files.map(async file => {
    const {
      originalname: originalName,
      filename,
      size,
      mimetype,
    } = file;

    const fileType = mimetype.match(/image/) ? 'image' : 'video';
    const url = `${SERVER_URL}${SERVER_FILES_PATH}${filename}`;

    const fileInfo = {
      originalName,
      fileType,
      size,
      url,
    };

    const { width, height } = await getMediaResolution(filename);

    fileInfo.width = width;
    fileInfo.height = height;

    // Если фотография разрешения 4К загружается с телефона, то она отображается перевёрнутой,
    // поэтому переворачиваем.
    if (width === 3840 && height === 2160) {
      await rotateImage(filename);
      const {
        width: widthAfterRotate,
        height: heightAfterRotate,
      } = await getMediaResolution(filename);

      fileInfo.width = widthAfterRotate;
      fileInfo.height = heightAfterRotate;
    }
    const posterName = fileType === 'image'
      ? await makeImagePoster(filename)
      : await makeVideoPoster(filename);

    fileInfo.posterUrl = `${SERVER_URL}${SERVER_FILES_PATH}${posterName}`;

    return fileInfo;
  }, []);


  const attachedFiles = await Promise.all(promises);

  const images = attachedFiles.filter(file => file.fileType === 'image');
  const videos = attachedFiles.filter(file => file.fileType === 'video');

  return [...images, ...videos];
};

module.exports = getAttachedFilesInfo;
