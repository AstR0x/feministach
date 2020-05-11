const config = require('config');

const SERVER_URL = config.get('SERVER_URL');

const getAttachedFilesInfo = files => {
  const normalizedFilesData = files.map(file => ({
    originalName: file.originalname,
    url: `${SERVER_URL}attached/files/${file.filename}`,
    size: file.size,
    fileType: file.mimetype.match(/image/) ? 'image' : 'video',
  }));

  const images = normalizedFilesData.filter(file => file.fileType === 'image');
  const videos = normalizedFilesData.filter(file => file.fileType === 'video');

  return {
    images,
    videos,
  };
};

module.exports = getAttachedFilesInfo;
