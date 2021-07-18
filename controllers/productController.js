const { request, response } = require('express');
const Product = require('../models/product');

const getAllProducts = async (req = request, res = response) => {
  const { start = 0, limit = 5 } = req.query;
  const query = { status: true };
  const [products, total] = await Promise.all([
    Product.find(query).populate('category', 'name').populate('user', 'name').skip(Number(start)).limit(Number(limit)),
    Product.countDocuments(query),
  ]);

  res.json({
    total,
    products,
  });
};

const saveProduct = async (req = request, res = response) => {
  const { name, price = 0, description = '', disposition = true, category } = req.body;
  const productData = {
    name: name.toUpperCase(),
    price,
    description,
    disposition,
    category,
    user: req.authUser.id,
  };

  const product = new Product(productData);
  await product.save();

  res.status(201).json({
    message: 'producto creado correctamente',
    product,
  });
};

const getProduct = async (req = request, res = response) => {
  const { product } = req.params;
  const productShow = await Product.findById(product).populate('category', 'name').populate('user', 'name');
  res.json({
    product: productShow,
  });
};

const updateProduct = async (req = request, res = response) => {
  const { name, price = 0, description = '', disposition = true, category } = req.body;
  const { product } = req.params;
  const productData = {
    name: name.toUpperCase(),
    price,
    description,
    disposition,
    category,
    user: req.authUser.id,
  };

  const productShow = await Product.findByIdAndUpdate(product, productData);

  res.status(201).json({
    message: 'producto actualizado correctamente',
    product: productShow,
  });
};

const deleteProduct = async (req = request, res = response) => {
  const { product } = req.params;
  const productDelete = await Product.findByIdAndUpdate(product, { status: false });
  res.json({
    message: 'Producto Eliminado',
    product: productDelete,
  });
};

module.exports = {
  getAllProducts,
  saveProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
