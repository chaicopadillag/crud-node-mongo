const { Router } = require('express');
const rootRouter = Router();

const authRouter = require('./authRouter');
const categoryRouter = require('./categoryRouter');
const productRouter = require('./productRouter');
const searchRouter = require('./searchRouter');
const uploadsRouter = require('./uploads');

rootRouter.use('/auth', authRouter);
rootRouter.use('/category', categoryRouter);
rootRouter.use('/product', productRouter);
rootRouter.use('/search', searchRouter);
rootRouter.use('/uploads', uploadsRouter)

module.exports = rootRouter;
