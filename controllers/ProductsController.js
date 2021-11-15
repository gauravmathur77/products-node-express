const productService = require('../services/ProductsServices');
const httpStatus = require('../constants/http-status-codes.json');
const apiResponse = require('../helpers/apiResponse');
const mailer = require("../utility/mailer");

// Retrieve all Accounts from the database.
exports.findAll = async function (req, res) {
    try {
        var products = await productService.findAll(req);
        return apiResponse.responseFormat(res, true, "Products found Successfully", { "products": products }, "", httpStatus.SUCCESS)
    } catch (e) {
        return apiResponse.responseFormat(res, false, "Products not found", "", "Some error has Occurred", httpStatus.INTERNAL_SERVER_ERROR)
    }
};

// Retrieve Accounts by Id from the database.
exports.findOne = async function (req, res) {
    try {
        var product = await productService.findOne(req.params.id);
        if (product) {
            return apiResponse.responseFormat(res, true, "Product found Successfully", product, "", httpStatus.SUCCESS)
        } else {
            return apiResponse.responseFormat(res, false, "Product not found", "", "User not found", httpStatus.NOT_FOUND)
        }
    } catch (e) {
        return apiResponse.responseFormat(res, false, "Users not found", "", "Some error has Occurred", httpStatus.INTERNAL_SERVER_ERROR)
    }
};

// Delete Accounts by Id from the database.
exports.delete = async function (req, res) {
    try {
        var product = await productService.delete(req.params.id);
        if (product) {
            return apiResponse.responseFormat(res, true, "Product deleted Successfully", product, "", httpStatus.SUCCESS)
        } else {
            return apiResponse.responseFormat(res, false, "Product not found", "", "product not found", httpStatus.NOT_FOUND)
        }
    } catch (e) {
        return apiResponse.responseFormat(res, false, "Users not found", "", "Some error has Occurred", httpStatus.INTERNAL_SERVER_ERROR)
    }
};

// Create Accounts in the database.
exports.createProduct = async function (req, res) {
    try {
        var product = await productService.create(req.body);
        if (product) {
            return apiResponse.responseFormat(res, true, "User created Successfully", {"asd":"Asd"}, "", httpStatus.SUCCESS)
        }
    } catch (e) {
        return apiResponse.responseFormat(res, false, "Some error has occurred", "", { "errors": JSON.parse(e.message) }, httpStatus.INTERNAL_SERVER_ERROR)
    }
};

// Update Accounts in the database.
exports.updateAccount = async function (req, res) {
    try {
        var oldData = await productService.findOne(req.params.id);
        if(oldData) {
            console.log(oldData)
            var updatedData = await productService.update( req.body, req.params.id);
            if (updatedData) {
                return apiResponse.responseFormat(res, true, "Product updated Successfully", updatedData, "", httpStatus.SUCCESS)
            }
        } else {
            return apiResponse.responseFormat(res, false, "User not found", "", { "errors": "Product not found" } , httpStatus.NOT_FOUND)
        }
    } catch (e) {
        return apiResponse.responseFormat(res, false, "Users not found", "", { "errors": JSON.parse(e.message) }, httpStatus.INTERNAL_SERVER_ERROR)
    }
};

