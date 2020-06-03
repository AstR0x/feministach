const path = require('path');
const config = require('config');

const { DEFAULT_OUTPUT_FILES_EXTNAME } = require('../constants');

const UPLOADS_FOLDER_PATH = config.get('UPLOADS_FOLDER_PATH');

const createFilename = (filename, addition, isOriginalExtname) => {
  const basename = path.basename(filename, path.extname(filename));

  return basename + addition + (isOriginalExtname
    ? path.extname(filename)
    : DEFAULT_OUTPUT_FILES_EXTNAME);
};

const createPathToFile = (
  filename,
  addition = '',
  isOriginalExtname = true,
) => {
  const createdFilename = createFilename(filename, addition, isOriginalExtname);
  return UPLOADS_FOLDER_PATH + createdFilename;
};

const createPathsToFiles = filename => ({
  pathToOriginalFile: createPathToFile(filename),
  pathToTempFile: createPathToFile(filename, '__temp', false),
  pathToPoster: createPathToFile(filename, '__poster', false),
});

module.exports = {
  createPathsToFiles,
  createFilename,
};
