const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

// إنشاء جلسة الدفع (Checkout)
router.post('/checkout', paymentController.createCheckoutSession);

// استلام تأكيدات الدفع (Webhook)
router.post('/webhook', express.raw({ type: 'application/json' }), paymentController.handleWebhook);

module.exports = router;
