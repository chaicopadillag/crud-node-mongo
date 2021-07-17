const bcrypt = require('bcryptjs');
const { generarJsonWebToken } = require('../helpers/jwt');
const User = require('../models/user');

const getUsers = async (req, res) => {
  const { authUser } = req;
  const { desde = 0, limite = 5 } = req.query;
  const query = { status: true };
  const [total_registros, users] = await Promise.all([User.countDocuments(query), User.find(query).skip(Number(desde)).limit(Number(limite))]);

  return res.json({
    authUser,
    total_registros,
    data: users,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  try {
    if (!user) {
      return res.status(400).json({
        message: 'El credenciales incorrectas: email',
      });
    }
    if (!user.status) {
      return res.status(400).json({
        message: 'El credenciales incorrectas: status',
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({
        message: 'El credenciales incorrectas: password',
      });
    }

    const token = await generarJsonWebToken(user._id);
    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: 'Error en el servidor',
    });
  }
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
