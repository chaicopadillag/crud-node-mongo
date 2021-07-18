const { request, response } = require('express');
const Category = require('../models/category');

const getAllCategories = async (req = request, res = response) => {
  const { desde = 0, limit = 5 } = req.query;

  const query = { status: true };

  const [categories, total] = await Promise.all([Category.find(query).populate('user', 'name').skip(Number(desde)).limit(Number(limit)), Category.countDocuments(query)]);

  res.json({
    total,
    categories,
  });
};

const saveCategory = async (req = request, res = response) => {
  const { name } = req.body;

  const category = new Category({ name: name.toUpperCase(), user: req.authUser.id });

  await category.save();

  res.status(201).json({
    message: 'Categoria creado correctamente',
    category,
  });
};

const getCategory = async (req = request, res = response) => {
  const { category } = req.params;

  const categoryShow = await Category.findById(category).populate('user', 'name');

  res.json({ category: categoryShow });
};

const updateCategory = async (req = request, res = response) => {
  const { category } = req.params;

  const { name } = req.body;

  const categoryUpdate = await Category.findByIdAndUpdate(category, { name: name.toUpperCase(), user: req.authUser.id });

  res.status(201).json({
    message: 'Categoria actualizado correctamente',
    categoryUpdate,
  });
};

const deleteCategory = async (req = request, res = response) => {
  const { category } = req.params;

  const categoryDelete = await Category.findByIdAndUpdate(category, { status: false });

  res.json({
    message: 'La categoria se ha eliminado correctamente',
    category: categoryDelete,
  });
};

module.exports = {
  getAllCategories,
  saveCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
