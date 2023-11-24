const OrderModel = require('../models/order')

const createAOrder = async (data) => {
    try {
        return await OrderModel.create(data);
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getAllOrders = async (query, offset, limit) => {
    try {
        return await OrderModel.find(query).skip(offset).limit(limit).lean();
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getOrdersCount = async (query) => {
    try {
        return await OrderModel.countDocuments(query);
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getSingleOrder = async (query) => {
    try {
        return await OrderModel.findOne(query).lean();
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = { getAllOrders, createAOrder, getOrdersCount, getSingleOrder }