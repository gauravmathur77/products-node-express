const { ValidationError } = require('sequelize'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    config = require('../configuration');
const accountsTokenDao = require('../dao/AccountsTokenDao')


// Create Accounts in the database.
exports.createToken = async function (req) {
    try {
        var token = await jwt.sign({ id: req.id }, config.getConfig().jwtSecret, {
            expiresIn: 86400 // expires in 24 hours
        });

        let request = {
            user_id: req.id,
            token: token,
            status: 1
        }
        var token = await accountsTokenDao.create(request);
        return token;
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

exports.updateToken = async function (token) {
    try {
        var token = await accountsTokenDao.updateToken(token);
        return token;
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

exports.getUserbyToken = async function (token) {
    try {
        var token = await accountsTokenDao.getUserbyToken(token);
        return token;
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


