const { ValidationError } = require('sequelize'),
    bcrypt = require('bcrypt');
const accountsDao = require('../dao/AccountsDao')

// Retrieve all Accounts from the database.
exports.findAll = async function (req) {
    try {
        var users = await accountsDao.findAll(req);
        return users;
    } catch (e) {
        // Log Errors
        console.log(e)
        throw Error('Error while Paginating Users')
    }
};

// Retrieve all Accounts from the database.
exports.findOne = async function (req) {
    try {
        var user = await accountsDao.findOne(req);
        return user;
    } catch (e) {
        // Log Errors
        console.log(e)
        throw Error('Error while Fetching User')
    }
};


// Delete all Accounts from the database.
exports.delete = async function (req) {
    try {
        var user = await accountsDao.delete(req);
        return user;
    } catch (e) {
        // Log Errors
        console.log(e)
        throw Error('Error while Fetching User')
    }
};

// Create Accounts in the database.
exports.create = async function (req) {
    try {
        var user = await accountsDao.create(req);
        return user;
    } catch (e) {
        // Log Errors
        let errors = [];
        if (e instanceof ValidationError) {
            e.errors.forEach((item) => {
                errors.push({ 'field': item.path, 'message': item.message });
            })
            throw Error(JSON.stringify(errors))
        }
    }
};

// Create Accounts in the database.
exports.update = async function (oldData, req, id) {
    try {
        var user = await accountsDao.update(req, id);
        return user;
    } catch (e) {
        // Log Errors
        let errors = [];
        if (e instanceof ValidationError) {
            e.errors.forEach((item) => {
                errors.push({ 'field': item.path, 'message': item.message });
            })
            throw Error(JSON.stringify(errors))
        }
    }
};


// Retrieve all Accounts from the database.
exports.findByUsername = async function (req) {
    try {
        var user = await accountsDao.findByUsername(req);
        return user;
    } catch (e) {
        // Log Errors
        console.log(e)
        throw Error('Error while Fetching User')
    }
};