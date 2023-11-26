const express = require('express');
const router = express.Router();
const adminAuthentication = require('../middlewares/authenticate');
const { addCustomer, getCustomers, createOrder, getOrders, addNewScan, getScan, dashboardData, getScans } = require('../controllers/adminController');

router.get('/dashboard-data', adminAuthentication, dashboardData);
router.post('/create-customer', adminAuthentication, addCustomer);
router.get('/get-all-customers', adminAuthentication, getCustomers);
router.post('/create-order', adminAuthentication, createOrder);
router.get('/get-all-orders', adminAuthentication, getOrders);
router.post('/new-scan', adminAuthentication, addNewScan);
router.get('/get-scan', adminAuthentication, getScan);
router.get('/get-all-scans', adminAuthentication, getScans);
module.exports = router;
