const config = require('config');

const makeVideoPoster = require('./makeVideoPoster');
const makeImagePoster = require('./makeImagePoster');
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

    const posterName = fileType === 'image'
      ? await makeImagePoster(file.filename)
      : await makeVideoPoster(file.filename);

    fileInfo.posterUrl = `${SERVER_URL}${SERVER_FILES_PATH}${posterName}`;

    const { width, height } = await getMediaInfo(file.filename);

    fileInfo.width = width;
    fileInfo.height = height;

    return fileInfo;
  }, []);


  const attachedFiles = await Promise.all(promises);

  const images = attachedFiles.filter(file => file.fileType === 'image');
  const videos = attachedFiles.filter(file => file.fileType === 'video');

  return [...images, ...videos];
};

module.exports = getAttachedFilesInfo;
