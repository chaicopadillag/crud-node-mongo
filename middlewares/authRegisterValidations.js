const { check } = require('express-validator');
const fieldsValidations = require('./fieldsValidations');
const { roleValidation, emailExistInUser, existUserById } = require('./fieldsDbValidations/authValidations');

const authRegisterValidations = [
  check('name', 'El nombre es requerido').not().isEmpty(),
  check('email', 'El correo electrónico no es válido').isEmail().normalizeEmail().custom(emailExistInUser),
  check('password').isLength({ min: 6 }).withMessage('La contraseña deber más de 6 carácteres'),
  check('role').custom(roleValidation),
  fieldsValidations,
];
const authUserUpdateValidations = [
  check('userId', 'El ID no es válido').isMongoId().custom(existUserById),
  check('name', 'El nombre es requerido').not().isEmpty(),
  // check('email', 'El correo electrónico no es válido').isEmail().normalizeEmail().custom(emailExistInUser),
  check('password').isLength({ min: 6 }).withMessage('La contraseña deber más de 6 carácteres'),
  check('role').custom(roleValidation),
  fieldsValidations,
];

const authUserDeleteValidations = [check('userId', 'El ID no es válido').isMongoId().custom(existUserById), fieldsValidations];

module.exports = { authRegisterValidations, authUserUpdateValidations, authUserDeleteValidations };
