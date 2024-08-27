const PurchaseOrder = require('../models/PurchaseOrder');
const Vendor = require('../models/Vendor');
const vendorController = require('./vendorController');

exports.createPurchaseOrder = async (req, res) => {
  try {
    const { vendorId, ...poData } = req.body;
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    const purchaseOrder = new PurchaseOrder({
      ...poData,
      vendor: vendorId,
      issueDate: new Date(),
    });

    await purchaseOrder.save();
    res.status(201).json(purchaseOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllPurchaseOrders = async (req, res) => {
  try {
    const { vendor } = req.query;
    let query = {};
    if (vendor) {
      query.vendor = vendor;
    }
    const purchaseOrders = await PurchaseOrder.find(query).populate('vendor', 'name vendorCode');
    res.json(purchaseOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(req.params.id).populate('vendor', 'name vendorCode');
    if (!purchaseOrder) {
      return res.status(404).json({ message: 'Purchase Order not found' });
    }
    res.json(purchaseOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(req.params.id);
    if (!purchaseOrder) {
      return res.status(404).json({ message: 'Purchase Order not found' });
    }

    const updatedPO = await PurchaseOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // If status is updated to 'completed', update delivery date
    if (req.body.status === 'completed' && !purchaseOrder.deliveryDate) {
      updatedPO.deliveryDate = new Date();
      await updatedPO.save();
    }

    // Update vendor performance metrics
    await vendorController.updateVendorPerformance(updatedPO.vendor);

    res.json(updatedPO);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findByIdAndDelete(req.params.id);
    if (!purchaseOrder) {
      return res.status(404).json({ message: 'Purchase Order not found' });
    }
    res.json({ message: 'Purchase Order deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.acknowledgePurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(req.params.id);
    if (!purchaseOrder) {
      return res.status(404).json({ message: 'Purchase Order not found' });
    }

    if (purchaseOrder.acknowledgmentDate) {
      return res.status(400).json({ message: 'Purchase Order already acknowledged' });
    }

    purchaseOrder.acknowledgmentDate = new Date();
    await purchaseOrder.save();

    // Update vendor performance metrics
    await vendorController.updateVendorPerformance(purchaseOrder.vendor);

    res.json(purchaseOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addQualityRating = async (req, res) => {
  try {
    const { rating } = req.body;
    if (rating < 0 || rating > 10) {
      return res.status(400).json({ message: 'Rating must be between 0 and 10' });
    }

    const purchaseOrder = await PurchaseOrder.findById(req.params.id);
    if (!purchaseOrder) {
      return res.status(404).json({ message: 'Purchase Order not found' });
    }

    if (purchaseOrder.status !== 'completed') {
      return res.status(400).json({ message: 'Can only rate completed purchase orders' });
    }

    purchaseOrder.qualityRating = rating;
    await purchaseOrder.save();

    // Update vendor performance metrics
    await vendorController.updateVendorPerformance(purchaseOrder.vendor);

    res.json(purchaseOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};