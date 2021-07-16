const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    require: [true, 'EL nombre es requerido'],
  },
  email: {
    type: String,
    require: [true, 'EL correo electrónico es requerido'],
    unique: true,
  },
  password: {
    type: String,
    require: [true, 'La contraseña es requerido'],
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    require: true,
    emun: ['USER_ROLE', 'ADMIN_ROLE'],
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

module.exports = model('User', UserSchema);
