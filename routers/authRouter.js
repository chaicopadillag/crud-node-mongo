const { Router } = require('express');
const authRouter = Router();
const validarToken = require('../middlewares/tokenMiddleware');
const { login, register, userUpdate, getUsers, userDelete } = require('../controllers/authController');
const { authRegisterValidations, authUserUpdateValidations, authUserDeleteValidations, authLoginValidations } = require('../middlewares/authMiddleware');

authRouter.get('/users', [validarToken], getUsers);
authRouter.post('/login', authLoginValidations, login);
authRouter.post('/register', authRegisterValidations, register);
authRouter.put('/user/:userId', authUserUpdateValidations, userUpdate);
authRouter.delete('/user/:userId', authUserDeleteValidations, userDelete);

module.exports = authRouter;
