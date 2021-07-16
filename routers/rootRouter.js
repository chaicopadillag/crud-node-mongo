const { Router } = require('express');
const rootRouter = Router();
const authRouter = require('./authRouter');

rootRouter.use('/auth', authRouter);

module.exports = rootRouter;
