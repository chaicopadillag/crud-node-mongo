const { Router } = require('express');
const { uploadFilePhoto, updateFilePhotoToModel, showFileImageModel, updateFilePhotoToCloudinary } = require('../controllers/uploadsController');
const { fileRequestValidation } = require('../middlewares/fieldsDbValidations/uploadFileValidation');
const { uploadFileMiddleware, showImageMiddleware } = require('../middlewares/uploadFileMiddleware');
const uploadsRouter = Router();

uploadsRouter.post('/file', fileRequestValidation, uploadFilePhoto);
// uploadsRouter.put('/:collection/:id', uploadFileMiddleware, updateFilePhotoToModel);
uploadsRouter.put('/:collection/:id', uploadFileMiddleware, updateFilePhotoToCloudinary);
uploadsRouter.get('/img/:collection/:id', showImageMiddleware, showFileImageModel)

module.exports = uploadsRouter;