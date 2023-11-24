const HardDriveModel = require('../models/hard-drive')

const createAScan = async (data) => {
    try {
        return await HardDriveModel.create(data);
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getAScan = async (query) => {
    try {
        return await HardDriveModel.findOne(query).lean();
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getAllScans = async (query) => {
    try {
        return await HardDriveModel.aggregate([
            {
                $lookup: {
                    from: 'orders',
                    localField: 'orderId',
                    foreignField: '_id',
                    as: 'orderInfo'
                }
            },
            {
                $unwind: '$orderInfo'
            },
            {
                $lookup: {
                    from: 'customers',
                    localField: 'orderInfo.customerId',
                    foreignField: '_id',
                    as: 'customerInfo'
                }
            },
            {
                $unwind: '$customerInfo'
            },
            {
                $project: {
                    _id: 1,
                    orderId: 1,
                    serialNumber: 1,
                    deletionStatus: 1,
                    orderInfo: {
                        devices: '$orderInfo.devices',
                        collectionDate: '$orderInfo.collectionDate',
                        authCode: '$orderInfo.authCode',
                    },
                    customerInfo: {
                        company: '$customerInfo.company',
                        name: '$customerInfo.name',
                        address: '$customerInfo.address',
                        email: '$customerInfo.email',
                    }
                }
            }
        ]);

    } catch (error) {
        console.log(error);
        return null;
    }
}

const getScansCount = async (query) => {
    try {
        return await HardDriveModel.countDocuments(query);
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { createAScan, getScansCount, getAScan, getAllScans }