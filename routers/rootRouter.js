const { Router } = require('express');
const rootRouter = Router();
const authRouter = require('./authRouter');
const categoryRouter = require('./categoryRouter');
const productRouter = require('./productRouter');
const searchRouter = require('./searchRouter');

rootRouter.use('/auth', authRouter);
rootRouter.use('/category', categoryRouter);
rootRouter.use('/product', productRouter);
rootRouter.use('/search', searchRouter);

module.exports = rootRouter;
