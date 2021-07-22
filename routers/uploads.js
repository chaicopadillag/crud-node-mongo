const { Router } = require('express');
const { uploadPhotoProfile } = require('../controllers/uploadsController');
const uploadsRouter = Router();

uploadsRouter.post('/photo-profile', uploadPhotoProfile)

module.exports = uploadsRouter;