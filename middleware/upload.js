const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './../uploads');
  },
  filename(req, file, callback) {
    callback(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const limits = {
  fileSize: 50000000,
  files: 5,
};

const upload = multer({
  storage,
  limits,
}).array('files');

module.exports = upload;
