const { check } = require('express-validator');
const { allowedCollection, idsExitsCollections, fileRequestValidation } = require('./fieldsDbValidations/uploadFileValidation');
const fieldsValidations = require('./fieldsValidations');

const uploadFileMiddleware = [
    fileRequestValidation,
    check('id', 'El ID de la collección no es válido').isMongoId().custom(idsExitsCollections),
    check('collection').custom(c => allowedCollection(c, ['user', 'product'])),
    fieldsValidations
];

const showImageMiddleware = [
    check('id', 'El ID de la collección no es válido').isMongoId().custom(idsExitsCollections),
    check('collection').custom(c => allowedCollection(c, ['user', 'product'])),
    fieldsValidations
];

module.exports = { uploadFileMiddleware, showImageMiddleware }