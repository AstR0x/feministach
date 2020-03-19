const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const AdminModel = model('Admin', adminSchema);

module.exports = AdminModel;
