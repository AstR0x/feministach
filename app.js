const path = require('path');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');

const PostController = require('./controllers/PostController');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage, limits: { fieldSize: 200000 } }).array('images');


const post = new PostController();

app.get('/posts', post.index);
app.get('/posts/:id', post.read);
app.post('/posts', post.create);
app.patch('/posts/:id', post.update);
app.post('/upload', upload, (req, res) => {
  console.log(req.body);
  res.send('Ok');
});

const PORT = config.get('PORT') || 5000;
const MONGO_DB_URL = process.env.MONGO_DB_URL;

async function start() {
  try {
    await mongoose.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => {
      console.log(`Server has been started on ${PORT}!`);
    });
  } catch (e) {
    console.log('Server error', e.measure);
    process.exitCode(1);
  }
}

start();
