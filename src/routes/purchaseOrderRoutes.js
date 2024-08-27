const express = require('express');
const router = express.Router();
const purchaseOrderController = require('../controllers/purchaseOrderController');
// const auth = require('../middleware/auth');

// router.post('/', auth, purchaseOrderController.createPurchaseOrder);
// router.get('/', auth, purchaseOrderController.getAllPurchaseOrders);
// router.get('/:id', auth, purchaseOrderController.getPurchaseOrder);
// router.put('/:id', auth, purchaseOrderController.updatePurchaseOrder);
// router.delete('/:id', auth, purchaseOrderController.deletePurchaseOrder);
// router.post('/:id/acknowledge', auth, purchaseOrderController.acknowledgePurchaseOrder);
// router.post('/:id/rate', auth, purchaseOrderController.addQualityRating);

router.post('/', purchaseOrderController.createPurchaseOrder);
router.get('/', purchaseOrderController.getAllPurchaseOrders);
router.get('/:id', purchaseOrderController.getPurchaseOrder);
router.put('/:id', purchaseOrderController.updatePurchaseOrder);
router.delete('/:id', purchaseOrderController.deletePurchaseOrder);
router.post('/:id/acknowledge', purchaseOrderController.acknowledgePurchaseOrder);
router.post('/:id/rate', purchaseOrderController.addQualityRating);

module.exports = router;