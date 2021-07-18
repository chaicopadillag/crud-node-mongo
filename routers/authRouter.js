const { Router } = require('express');
const authRouter = Router();
const validarToken = require('../middlewares/tokenMiddleware');
const { login, register, userUpdate, getUsers, userDelete, googleAuth } = require('../controllers/authController');
const {
  authRegisterValidations,
  authUserUpdateValidations,
  authUserDeleteValidations,
  authLoginValidations,
  authLoginGoogleValidations,
} = require('../middlewares/authMiddleware');

authRouter.get('/users', validarToken, getUsers);
authRouter.post('/login', authLoginValidations, login);
authRouter.post('/register', authRegisterValidations, register);
authRouter.put('/user/:userId', authUserUpdateValidations, userUpdate);
authRouter.delete('/user/:userId', authUserDeleteValidations, userDelete);
authRouter.post('/google', authLoginGoogleValidations, googleAuth);

module.exports = authRouter;
