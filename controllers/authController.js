const bcrypt = require('bcryptjs');
const User = require('../models/user');

const getUsers = async (req, res) => {
  const { desde = 0, limite = 5 } = req.query;
  const query = { status: true };
  const [total_registros, users] = await Promise.all([User.countDocuments(query), User.find(query).skip(Number(desde)).limit(Number(limite))]);

  return res.json({
    total_registros,
    data: users,
  });
};

const login = (req, res) => {
  return res.json({
    data: 'AuthUser',
  });
};

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = new User({ name, email, password, role });

  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  await user.save();

  return res.json({
    data: user,
  });
};

const userUpdate = async (req, res) => {
  const { userId } = req.params;
  const { _id, password, google, email, ...userData } = req.body;
  if (password) {
    const salt = bcrypt.genSaltSync();
    userData.password = bcrypt.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(userId, userData);

  return res.json({
    message: 'Usuario Actualizado',
    user,
  });
};

const userDelete = async (req, res) => {
  const { userId } = req.params;

  // await User.findByIdAndDelete(userId);
  const user = await User.findByIdAndUpdate(userId, { status: false });

  return res.json({
    message: 'Usuario Eliminado',
    user,
  });
};

module.exports = {
  login,
  register,
  userUpdate,
  getUsers,
  userDelete,
};
