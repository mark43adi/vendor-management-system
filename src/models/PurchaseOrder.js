const mongoose = require('mongoose');

const PurchaseOrderSchema = new mongoose.Schema({
  poNumber: { type: String, required: true, unique: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  orderDate: { type: Date, required: true },
  deliveryDate: Date,
  items: { type: Object, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, required: true },
  qualityRating: Number,
  issueDate: { type: Date, required: true },
  acknowledgmentDate: Date
});

module.exports = mongoose.model('PurchaseOrder', PurchaseOrderSchema);