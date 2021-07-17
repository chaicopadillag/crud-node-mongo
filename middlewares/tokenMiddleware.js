const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validarToken = async (req, res, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      message: 'No esta autenticado',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
    const user = await User.findById(uid);

    if (!user || !user.status) {
      return res.status(401).json({
        message: 'Usuario bloqueado',
      });
    }

    req.authUser = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: 'No esta autenticado token no valido error',
    });
  }
};

module.exports = validarToken;
