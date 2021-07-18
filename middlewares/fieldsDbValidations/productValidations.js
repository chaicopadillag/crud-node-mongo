const Product = require('../../models/product');

const thisProductExistSave = async (name = '') => {
  const productExist = await Product.findOne({ name: name.toUpperCase() });
  if (productExist) {
    throw new Error(`El producto ${name} ya existe en la base de datos`);
  }
};

const thisProductExistUpdate = async (name = '', petition) => {
  const { product } = petition.req.params;
  const productExist = await Product.findOne({ name: name.toUpperCase() });
  if (productExist) {
    if (productExist._id.toString() !== product) {
      throw new Error(`El producto ${name} ya existe en la base de datos`);
    }
  }
};

const existProductById = async (product) => {
  const productExist = await Product.findById(product);
  if (!productExist) {
    throw new Error(`El producto con ID ${product} no existe en la base de datos`);
  }
};

module.exports = {
  thisProductExistSave,
  thisProductExistUpdate,
  existProductById,
};
