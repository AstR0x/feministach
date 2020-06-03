const fs = require('fs');
const https = require('https');
const path = require('path');
const express = require('express');
const httpsRedirect = require('express-https-redirect');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');

const limiter = require('./middleware/rateLimiter');

const postRouter = require('./routes/post');
const authRouter = require('./routes/auth');

const app = express();

const SERVER_FILES_PATH = config.get('SERVER_FILES_PATH');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(`/${SERVER_FILES_PATH}`, express.static(path.resolve(__dirname, '../', 'uploads')));
app.use('/posts', limiter, postRouter);
app.use('/auth', authRouter);

const HTTP_PORT = config.get('HTTP_PORT');

const MONGO_DB_URL = process.env.MONGO_DB_URL;

const start = async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      app.use('/', httpsRedirect());
      app.use('/', express.static(path.join(__dirname, 'client', 'dist')));

      app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
      });

      const HTTPS_PORT = config.get('HTTPS_PORT');

      const key = fs.readFileSync(config.get('PRIVATE_KEY_PATH'));
      const cert = fs.readFileSync(config.get('CERTIFICATE_PATH'));

      https.createServer({ key, cert }, app).listen(HTTPS_PORT, () => {
        console.log(`Server is starting on ${HTTPS_PORT} port`);
      });
    }

    app.listen(HTTP_PORT, () => {
      console.log(`Server is starting on ${HTTP_PORT} port`);
    });

    await mongoose.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch (e) {
    console.log('Server error', e.measure);
    process.exit(1);
  }
};

start();
