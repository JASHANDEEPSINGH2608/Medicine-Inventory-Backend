const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: Number,
  quantity: { type: Number, required: true },
  manufacturer: { type: String, required: true },
  imageUrl: String
});

module.exports = mongoose.model('Medicine', MedicineSchema);
