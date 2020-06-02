const path = require('path');
const config = require('config');

const UPLOADS_FOLDER_PATH = config.get('UPLOADS_FOLDER_PATH');

const EXTNAME = '.png';

const createFilename = (filename, addition) => `${path.basename(filename, path.extname(filename))}${addition}${EXTNAME}`;

const createPathToFile = (filename, addition) => {
  return `${UPLOADS_FOLDER_PATH}${createFilename(filename, addition)}`;
};

const createPathsToFiles = filename => ({
  pathToOriginalFile: `${UPLOADS_FOLDER_PATH}${path.basename(filename)}`,
  pathToTempFile: `${createPathToFile(filename, '__temp')}`,
  pathToPoster: `${createPathToFile(filename, '__poster')}`,
});

module.exports = { createPathsToFiles, createFilename };
