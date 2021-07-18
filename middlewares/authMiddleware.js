const { check } = require('express-validator');
const fieldsValidations = require('./fieldsValidations');
const { roleValidation, emailExistInUser, existUserById } = require('./fieldsDbValidations/authValidations');
const validarToken = require('./tokenMiddleware');
const { esAdminRole, verificarRol } = require('./fieldsDbValidations/roleValidations');

const authRegisterValidations = [
  check('name', 'El nombre es requerido').not().isEmpty(),
  check('email', 'El correo electrónico no es válido').isEmail().normalizeEmail().custom(emailExistInUser),
  check('password').isLength({ min: 6 }).withMessage('La contraseña deber más de 6 carácteres'),
  check('role').custom(roleValidation),
  fieldsValidations,
];

const authUserUpdateValidations = [
  check('userId', 'El ID no es válido').exists({ checkNull: true }).bail().isMongoId().bail().custom(existUserById),
  check('name', 'El nombre es requerido').not().isEmpty(),
  // check('email', 'El correo electrónico no es válido').isEmail().normalizeEmail().custom(emailExistInUser),
  check('password').isLength({ min: 6 }).withMessage('La contraseña deber más de 6 carácteres'),
  check('role').custom(roleValidation),
  fieldsValidations,
];

const authUserDeleteValidations = [
  validarToken,
  esAdminRole,
  verificarRol('USER_ROLE', 'ADMIN_ROLE'),
  check('userId', 'El ID no es válido').exists({ checkNull: true }).bail().isMongoId().bail().custom(existUserById),
  fieldsValidations,
];

const authLoginValidations = [check('email', 'El correo electrónico no es válido').isEmail(), check('password', 'La contraseña es requerido').not().isEmpty(), fieldsValidations];

const authLoginGoogleValidations = [check('google_token', 'El token Ó el key del google es requerido').not().isEmpty(), fieldsValidations];

module.exports = {
  authRegisterValidations,
  authUserUpdateValidations,
  authUserDeleteValidations,
  authLoginValidations,
  authLoginGoogleValidations,
};
