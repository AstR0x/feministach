const { Router } = require('express');

const AdminController = require('../controllers/AdminController');

const router = Router();

const admin = new AdminController();

router.post('/', admin.read);
// router.post('/', admin.create);

module.exports = router;
