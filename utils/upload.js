const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './../uploads');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fieldSize: 2000000 },
}).array('files');

module.exports = upload;
