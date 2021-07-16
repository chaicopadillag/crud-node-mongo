const { Router } = require('express');
const authRouter = Router();
const { login, register, userUpdate, getUsers, userDelete } = require('../controllers/authController');
const { authRegisterValidations, authUserUpdateValidations, authUserDeleteValidations } = require('../middlewares/authRegisterValidations');

authRouter.get('/users', getUsers);
authRouter.post('/login', login);
authRouter.post('/register', authRegisterValidations, register);
authRouter.put('/user/:userId', authUserUpdateValidations, userUpdate);
authRouter.delete('/user/:userId', authUserDeleteValidations, userDelete);

module.exports = authRouter;
