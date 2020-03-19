const { Router } = require('express');

const upload = require('../utils/upload');
const PostController = require('../controllers/PostController');

const router = Router();

const post = new PostController();

router.get('/', post.index);
router.get('/:id', post.read);
router.post('/', upload, post.create);
router.patch('/:id', upload, post.update);

module.exports = router;
