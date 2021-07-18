const { request, response } = require('express');
const Product = require('../models/product');
const User = require('../models/user');
const Category = require('../models/category');

const modules = ['product', 'category', 'user'];

const searchProductsByNameAndDescription = async (searchable, res = response) => {
  const regexSearch = new RegExp(searchable, 'i');

  const products = await Product.find({
    $or: [{ name: regexSearch }, { description: regexSearch }],
    $and: [{ status: true }],
  })
    .populate('product', 'name')
    .populate('user', 'name');

  return res.json({
    data: products,
  });
};

const searchUsersByNameAndEmail = async (searchable, res = response) => {
  const regexSearch = new RegExp(searchable, 'i');

  const users = await User.find({
    $or: [{ name: regexSearch }, { email: regexSearch }],
    $and: [{ status: true }],
  });

  return res.json({
    data: users,
  });
};

const searchCategorysByName = async (searchable, res = response) => {
  const regexSearch = new RegExp(searchable, 'i');

  const categories = await Category.find({ name: regexSearch, status: true }).populate('user', 'name');

  return res.json({
    data: categories,
  });
};

const searchKeywords = (req = request, res = response) => {
  const { module, searchable } = req.params;

  if (!modules.includes(module)) {
    return res.status(401).json({
      message: 'Solo se permite de estos modulos:',
      modules,
    });
  }

  switch (module) {
    case 'product':
      searchProductsByNameAndDescription(searchable, res);
      break;
    case 'category':
      searchCategorysByName(searchable, res);
      break;
    case 'user':
      searchUsersByNameAndEmail(searchable, res);
      break;
    default:
      res.status(401).json({
        message: 'El modulo no tiene esta función implementado',
      });
      break;
  }
};

module.exports = searchKeywords;
