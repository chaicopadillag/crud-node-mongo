const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, 'El campo nombre de la producto es requirido'],
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  price: { type: Number, default: 0 },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  imgUrl: { type: String },
  description: { type: String },
  disposition: { type: Boolean, default: true },
});

ProductSchema.methods.toJSON = function () {
  const { __v, _id, status, ...product } = this.toObject();
  product.id = _id;
  return product;
};

module.exports = model('Product', ProductSchema);
