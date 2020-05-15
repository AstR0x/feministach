const config = require('config');

const takeScreenshot = require('./takeScreenshot');
const getMediaInfo = require('./getMediaInfo');

const SERVER_URL = config.get('SERVER_URL');
const SERVER_FILES_PATH = config.get('SERVER_FILES_PATH');

const getAttachedFilesInfo = async files => {
  const promises = files.map(async file => {
    const fileType = file.mimetype.match(/image/) ? 'image' : 'video';
    const url = `${SERVER_URL}${SERVER_FILES_PATH}${file.filename}`;
    const originalName = file.originalname;
    const size = file.size;

    const fileInfo = {
      originalName,
      fileType,
      size,
      url,
    };

    if (fileInfo.fileType === 'video') {
      const posterName = await takeScreenshot(file.filename);

      fileInfo.posterUrl = `${SERVER_URL}${SERVER_FILES_PATH}${posterName}`;
    }

    const { width, height } = await getMediaInfo(file.filename);

    fileInfo.width = width;
    fileInfo.height = height;

    return fileInfo;
  });

  const normalizedFilesData = await Promise.all(promises);

  const images = normalizedFilesData.filter(file => file.fileType === 'image');
  const videos = normalizedFilesData.filter(file => file.fileType === 'video');

  return {
    images,
    videos,
  };
};

module.exports = getAttachedFilesInfo;
