const Role = require('../../models/role');
const User = require('../../models/user');

const roleValidation = async (rol = '') => {
  const existRole = await Role.findOne({ name: rol });
  if (!existRole) {
    throw new Error('El campo rol no es válido');
  }
};

const emailExistInUser = async (email = '') => {
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new Error(`El correo electrónico ${email} ya ha sido usado por otro usuario`);
  }
};
const existUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('No usuario con el ID ' + id);
  }
};

module.exports = {
  roleValidation,
  emailExistInUser,
  existUserById,
};
