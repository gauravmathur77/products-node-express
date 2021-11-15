const apiServices = require('../services/AccountsServices');
const httpStatus = require('../constants/http-status-codes.json');
const apiResponse = require('../helpers/apiResponse');
const mailer = require("../utility/mailer");

// Retrieve all Accounts from the database.
exports.findAll = async function (req, res) {
    try {
        var users = await apiServices.findAll(req);
        return apiResponse.responseFormat(res, true, "Users found Successfully", { "users": users }, "", httpStatus.SUCCESS)
    } catch (e) {
        return apiResponse.responseFormat(res, false, "Users not found", "", "Some error has Occurred", httpStatus.INTERNAL_SERVER_ERROR)
    }
};

// Retrieve Accounts by Id from the database.
exports.findOne = async function (req, res) {
    try {
        var user = await apiServices.findOne(req.params.id);
        if (user) {
            return apiResponse.responseFormat(res, true, "User found Successfully", user, "", httpStatus.SUCCESS)
        } else {
            return apiResponse.responseFormat(res, false, "User not found", "", "User not found", httpStatus.NOT_FOUND)
        }
    } catch (e) {
        return apiResponse.responseFormat(res, false, "Users not found", "", "Some error has Occurred", httpStatus.INTERNAL_SERVER_ERROR)
    }
};

// Delete Accounts by Id from the database.
exports.delete = async function (req, res) {
    try {
        var user = await apiServices.delete(req.params.id);
        if (user) {
            return apiResponse.responseFormat(res, true, "User deleted Successfully", user, "", httpStatus.SUCCESS)
        } else {
            return apiResponse.responseFormat(res, false, "User not found", "", "User not found", httpStatus.NOT_FOUND)
        }
    } catch (e) {
        return apiResponse.responseFormat(res, false, "Users not found", "", "Some error has Occurred", httpStatus.INTERNAL_SERVER_ERROR)
    }
};

// Create Accounts in the database.
exports.createAccount = async function (req, res) {
    try {
        var user = await apiServices.create(req.body);
        if (user) {
            // mailer.sendEmail('gauravmathur77@gmail.com', 'User created successfully', 'Your account has been created');
            return apiResponse.responseFormat(res, true, "User created Successfully", user, "", httpStatus.SUCCESS)
        }
    } catch (e) {
        return apiResponse.responseFormat(res, false, "Users not found", "", { "errors": JSON.parse(e.message) }, httpStatus.INTERNAL_SERVER_ERROR)
    }
};

// Create Accounts in the database.
exports.updateAccount = async function (req, res) {
    try {
        var oldData = await apiServices.findOne(req.params.id);
        if(oldData) {
            var updatedData = await apiServices.update(oldData, req.body, req.params.id);
            if (updatedData) {
                return apiResponse.responseFormat(res, true, "User updated Successfully", updatedData, "", httpStatus.SUCCESS)
            }
        } else {
            return apiResponse.responseFormat(res, false, "User not found", "", { "errors": "User not found" } , httpStatus.NOT_FOUND)
        }
    } catch (e) {
        return apiResponse.responseFormat(res, false, "Users not found", "", { "errors": JSON.parse(e.message) }, httpStatus.INTERNAL_SERVER_ERROR)
    }
};

