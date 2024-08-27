const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

router.post('/', vendorController.createVendor);
router.get('/', vendorController.getAllVendors);
router.get('/:id', vendorController.getVendor);
router.put('/:id', vendorController.updateVendor);
router.delete('/:id', vendorController.deleteVendor);
router.get('/:id/performance', vendorController.getVendorPerformance);

module.exports = router;