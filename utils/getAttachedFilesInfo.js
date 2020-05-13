const config = require('config');
const ffmpeg = require('fluent-ffmpeg');

const SERVER_URL = config.get('SERVER_URL');
const SERVER_FILES_PATH = config.get('SERVER_FILES_PATH');
const UPLOADS_FOLDER_PATH = config.get('UPLOADS_FOLDER_PATH');

const takeScreenshot = filename => {
  return new Promise((resolve, reject) => {
    ffmpeg(`${UPLOADS_FOLDER_PATH}${filename}`)
      .screenshots({
        timestamps: ['5%'],
        folder: './../uploads',
        filename: '%b.png',
      })
      .on('end', () => {
        const posterName = `${filename.split('.')[0]}.png`;

        resolve(posterName);
      });
  });
};

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
