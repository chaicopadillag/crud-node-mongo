const { Router } = require('express');
const { getAllCategories, saveCategory, getCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { categoryPostMiddleware, getCategoryMiddleware, categoryPutMiddleware } = require('../middlewares/categoryMiddleware');
const categoryRouter = Router();

categoryRouter.get('/', getAllCategories);

categoryRouter.post('/', categoryPostMiddleware, saveCategory);

categoryRouter.get('/:category', getCategoryMiddleware, getCategory);

categoryRouter.put('/:category', categoryPutMiddleware, updateCategory);

categoryRouter.delete('/:category', getCategoryMiddleware, deleteCategory);

module.exports = categoryRouter;
