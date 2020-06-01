const path = require('path');
const config = require('config');

const UPLOADS_FOLDER_PATH = config.get('UPLOADS_FOLDER_PATH');

const EXTNAME = '.png';

const createFileName = (filename, addition) => {
  return `${path.basename(filename, path.extname(filename))}${addition || ''}${EXTNAME}`;
};

const createPathsToFiles = filename => {
  return {
    pathToOriginalFile: createFileName(filename),
    pathToTempFile: createFileName(filename, '__temp'),
    pathToPoster: createFileName(filenamem '__poster'),
  };
};

module.exports = createFilename;
