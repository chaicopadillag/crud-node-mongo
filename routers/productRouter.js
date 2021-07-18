const { Router } = require('express');
const { getAllProducts, saveProduct, updateProduct, deleteProduct, getProduct } = require('../controllers/productController');
const { productSaveMiddleware, getProductMiddleware, productoUpdateMiddleware } = require('../middlewares/productMiddleware');

const productRouter = Router();

productRouter.get('/', getAllProducts);

productRouter.post('/', productSaveMiddleware, saveProduct);

productRouter.get('/:product', getProductMiddleware,getProduct);

productRouter.put('/:product', productoUpdateMiddleware, updateProduct);

productRouter.delete('/:product', getProductMiddleware,deleteProduct);

module.exports = productRouter;
