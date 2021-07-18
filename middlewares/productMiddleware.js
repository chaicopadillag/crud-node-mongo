const { check } = require('express-validator');
const { existCategoryById } = require('./fieldsDbValidations/categoryValidations');
const { thisProductExistSave, existProductById, thisProductExistUpdate } = require('./fieldsDbValidations/productValidations');
const fieldsValidations = require('./fieldsValidations');
const validarToken = require('./tokenMiddleware');

const productSaveMiddleware = [
  validarToken,
  check('name', 'Es nombre del producto es requerido').not().isEmpty(),
  check('price', 'Es precio del producto es requerido').isNumeric(),
  check('disposition', 'La disponibilidad del producto es requerido y boleano').isBoolean(),
  check('category', 'La categoria no es válido').exists({ checkNull: true }).bail().isMongoId().bail().custom(existCategoryById),
  check('name').custom(thisProductExistSave),
  fieldsValidations,
];

const getProductMiddleware = [
  validarToken,
  check('product', 'El ID de producto no es válido').exists({ checkNull: true }).bail().isMongoId().bail().custom(existProductById),
  fieldsValidations,
];

const productoUpdateMiddleware = [
  validarToken,
  check('name', 'Es nombre del producto es requerido').not().isEmpty(),
  check('price', 'Es precio del producto es requerido').isNumeric(),
  check('disposition', 'La disponibilidad del producto es requerido y boleano').isBoolean(),
  check('category', 'La categoria no es válido').exists({ checkNull: true }).bail().isMongoId().bail().custom(existCategoryById),
  check('name').custom(thisProductExistUpdate),
  fieldsValidations,
];

module.exports = {
  productSaveMiddleware,
  getProductMiddleware,
  productoUpdateMiddleware,
};
