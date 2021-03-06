const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  products: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      total_price: {
        type: Number,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

cartSchema.pre(/^find/, function (next) {
  this.populate('products.product');
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
