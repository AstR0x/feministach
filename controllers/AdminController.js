const AdminModel = require('../models/Admin');

class AdminController {
  read(req, res) {
    AdminModel.findOne({
      email: req.body.email,
      password: req.body.password,
    })
      .then(admin => {
        if (!admin) {
          res.sendStatus(404);
        } else {
          res.sendStatus(200);
        }
      });
  }

  // create(req, res) {
  //   const { email, password } = req.body;
  //
  //   const adminModel = new AdminModel({
  //     email,
  //     password,
  //   });
  //
  //   adminModel.save()
  //     .then(() => {
  //       res.json({ status: 'ok' });
  //     });
  // }
}

module.exports = AdminController;
