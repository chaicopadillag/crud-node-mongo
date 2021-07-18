const { check } = require('express-validator');
const { thisCategoryExistSave, existCategoryById, thisCategoryExistUpdate } = require('./fieldsDbValidations/categoryValidations');
const fieldsValidations = require('./fieldsValidations');
const validarToken = require('./tokenMiddleware');

const categoryPostMiddleware = [
  validarToken,
  check('name', 'Es nombre de la categoria es requerido').not().isEmpty(),
  check('name').custom(thisCategoryExistSave),
  fieldsValidations,
];

const getCategoryMiddleware = [
  validarToken,
  check('category', 'El ID de la categoria no es válido').exists({ checkNull: true }).bail().isMongoId().bail().custom(existCategoryById),
  fieldsValidations,
];

const categoryPutMiddleware = [
  validarToken,
  check('name', 'Es nombre de la categoria es requerido').not().isEmpty(),
  check('category', 'El ID de la categoria no es válido').exists({ checkNull: true }).bail().isMongoId().bail().custom(existCategoryById),
  check('name').custom(thisCategoryExistUpdate),
  fieldsValidations,
];

module.exports = {
  categoryPostMiddleware,
  getCategoryMiddleware,
  categoryPutMiddleware,
};
