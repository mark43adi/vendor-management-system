const Vendor = require('../models/Vendor');
const PurchaseOrder = require('../models/PurchaseOrder');

exports.createVendor = async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    await vendor.save();
    res.status(201).json(vendor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    res.json(vendor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    res.json({ message: 'Vendor deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVendorPerformance = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    
    const performance = {
      onTimeDeliveryRate: vendor.onTimeDeliveryRate,
      qualityRatingAvg: vendor.qualityRatingAvg,
      averageResponseTime: vendor.averageResponseTime,
      fulfillmentRate: vendor.fulfillmentRate
    };
    
    res.json(performance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateVendorPerformance = async (vendorId) => {
  try {
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) throw new Error('Vendor not found');

    const purchaseOrders = await PurchaseOrder.find({ vendor: vendorId });

    // Calculate metrics (simplified version)
    const completedOrders = purchaseOrders.filter(po => po.status === 'completed');
    const onTimeDeliveries = completedOrders.filter(po => po.deliveryDate <= po.orderDate).length;
    
    vendor.onTimeDeliveryRate = completedOrders.length > 0 ? onTimeDeliveries / completedOrders.length : 0;
    
    const qualityRatings = completedOrders.filter(po => po.qualityRating).map(po => po.qualityRating);
    vendor.qualityRatingAvg = qualityRatings.length > 0 ? qualityRatings.reduce((a, b) => a + b) / qualityRatings.length : 0;
    
    const responseTimes = purchaseOrders
      .filter(po => po.acknowledgmentDate)
      .map(po => po.acknowledgmentDate - po.issueDate);
    vendor.averageResponseTime = responseTimes.length > 0 ? responseTimes.reduce((a, b) => a + b) / responseTimes.length : 0;
    
    vendor.fulfillmentRate = purchaseOrders.length > 0 ? completedOrders.length / purchaseOrders.length : 0;

    await vendor.save();
  } catch (error) {
    console.error('Error updating vendor performance:', error);
  }
};