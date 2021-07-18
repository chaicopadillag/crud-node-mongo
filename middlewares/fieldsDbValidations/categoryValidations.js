const Category = require('../../models/category');

const thisCategoryExistSave = async (name = '') => {
  const categoryExist = await Category.findOne({ name: name.toUpperCase() });
  if (categoryExist) {
    throw new Error(`La categoria ${name} ya existe en la base de datos`);
  }
};

const thisCategoryExistUpdate = async (name = '', petition) => {
  const { category } = petition.req.params;
  const categoryExist = await Category.findOne({ name: name.toUpperCase() });
  if (categoryExist) {
    if (categoryExist._id.toString() !== category) {
      throw new Error(`La categoria ${name} ya existe en la base de datos`);
    }
  }
};

const existCategoryById = async (category) => {
  const categoryExist = await Category.findById(category);
  if (!categoryExist) {
    throw new Error(`La categoria con ID ${category} no existe en la base de datos`);
  }
};

module.exports = {
  thisCategoryExistSave,
  existCategoryById,
  thisCategoryExistUpdate,
};
