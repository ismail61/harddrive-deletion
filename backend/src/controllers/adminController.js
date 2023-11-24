const { customerValidation, getQueryCustomersValidation, orderValidation, getQueryOrdersValidation, scanValidation } = require('../validations/admin');
const { createAOrder, getAllOrders, getOrdersCount, getSingleOrder } = require('../services/order');
const { createAScan, getAScan, getScansCount, getAllScans } = require('../services/scan');
const { getAllCustomers, findCustomer, addCustomerIntoDB, getCustomersCount } = require('../services/customer');
const generateAuthCode = require('../utils/generate-auth-code');
const HardDriveDeletionStatusEnum = require('../models/enum');

async function addCustomer(req, res) {
    try {
        const { email } = req.body;

        // Validate admin information
        const validation = customerValidation(req.body);
        if (validation.error) {
            return res.status(422).json({ success: false, message: validation.error.details[0].message });
        }

        // Find the customer in the database
        const customer = await findCustomer({ email });
        if (customer) {
            return res.status(400).json({ success: false, message: 'Already customer email exists' });
        }

        const newCustomer = await addCustomerIntoDB(req.body);
        if (!newCustomer) {
            return res.status(400).json({ success: false, message: 'Could not create a new customer' });
        }
        return res.json({ success: true, data: newCustomer });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

async function getCustomers(req, res) {
    try {
        // Validate admin information
        const validation = getQueryCustomersValidation(req.query);
        if (validation.error) {
            return res.status(422).json({ success: false, message: validation.error.details[0].message });
        }
        const { page, limit = 15, ...rest } = req.query;
        const offset = (Number(page) - 1) * Number(limit);
        if (rest?.customerId) {
            rest._id = rest.customerId;
        }

        // Find all customers in the database
        const [customers, total] = await Promise.all([
            await getAllCustomers(rest || {}, offset, limit),
            await getCustomersCount(rest || {}),
        ]);
        return res.json({
            success: true, data: {
                customers,
                pageCount: Math.ceil(total / Number(limit)),
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

async function createOrder(req, res) {
    try {
        // Validate admin information
        const validation = orderValidation(req.body);
        if (validation.error) {
            return res.status(422).json({ success: false, message: validation.error.details[0].message });
        }

        const authCode = await generateAuthCode();
        const order = await createAOrder({ ...req.body, authCode });
        if (!order) {
            return res.status(400).json({ success: false, message: 'Could not create a new order' });
        }
        return res.json({ success: true, data: order });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

async function getOrders(req, res) {
    try {
        // Validate admin information
        const validation = getQueryOrdersValidation(req.query);
        if (validation.error) {
            return res.status(422).json({ success: false, message: validation.error.details[0].message });
        }

        const { page, limit = 15, ...rest } = req.query;
        const offset = (Number(page) - 1) * Number(limit);
        if (rest?.customerId) {
            rest.customerId = rest.customerId;
        }
        if (rest?.orderId) {
            rest._id = rest.orderId;
        }

        // Find all orders in the database
        const [orders, total] = await Promise.all([
            await getAllOrders(rest || {}, offset, limit),
            await getOrdersCount(rest || {}),
        ]);
        await Promise.all(orders.map(async order => {
            const customerId = order.customerId;
            const customerInfo = await findCustomer({ _id: customerId });
            order.customer = customerInfo;
            return order;
        }));
        return res.json({
            success: true, data: {
                orders,
                pageCount: Math.ceil(total / Number(limit)),
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

async function addNewScan(req, res) {
    try {
        // Validate admin information
        const validation = scanValidation(req.body);
        if (validation.error) {
            return res.status(422).json({ success: false, message: validation.error.details[0].message });
        }

        const checkValidOrderId = await getSingleOrder({ _id: req.body.orderId });
        if (!checkValidOrderId) {
            return res.status(400).json({ success: false, message: 'Invalid Order Id' });
        }

        const checkUniqueSerialNumber = await getAScan({ serialNumber: req.body.serialNumber });
        if (checkUniqueSerialNumber) {
            return res.status(400).json({ success: false, message: 'Please enter unique serial number' });
        }

        const scan = await createAScan(req.body);
        if (!scan) {
            return res.status(400).json({ success: false, message: 'Could not add scan device' });
        }
        return res.json({ success: true, data: scan });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

async function getScan(req, res) {
    try {
        const { serialNumber } = req.query;
        if (!serialNumber || serialNumber === '') {
            return res.status(422).json({ success: false, message: 'Provide a valid serial number' });
        }

        const scan = await getAScan(req.query);
        if (!scan) {
            return res.status(400).json({ success: false, message: 'Could not get scan device' });
        }
        return res.json({ success: true, data: scan });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

async function getScans(req, res) {
    try {
        const scans = await getAllScans(req.query);
        return res.json({ success: true, data: scans });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

async function dashboardData(req, res) {
    try {
        const [customers, scannedDevices, deletedDevices, pendingDevices] = await Promise.all([
            await getCustomersCount({}),
            await getScansCount({}),
            await getScansCount({ deletionStatus: HardDriveDeletionStatusEnum.DELETED }),
            await getScansCount({ deletionStatus: HardDriveDeletionStatusEnum.NON_STARTED }),
        ]);
        return res.json({
            success: true, data: {
                customers,
                scannedDevices,
                deletedDevices,
                pendingDevices
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = { getCustomers, addCustomer, createOrder, getOrders, addNewScan, getScan, dashboardData, getScans };
