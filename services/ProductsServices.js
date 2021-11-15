const { ValidationError } = require('sequelize')
const productsDao = require('../dao/ProductsDao')
const db = require("../database/mysql_connection");
const productsAttributesDao = require('../dao/ProductsAttributes')

// Retrieve all Accounts from the database.
exports.findAll = async function (req) {
    try {
        var products = await productsDao.findAll(req);
        return products;
    } catch (e) {
        // Log Errors
        console.log(e)
        throw Error('Error while Paginating Users')
    }
};

// // Retrieve all Accounts from the database.
exports.findOne = async function (req) {
    try {
        var product = await productsDao.findOne(req);
        return product;
    } catch (e) {
        // Log Errors
        console.log(e)
        throw Error('Error while Fetching User')
    }
};


// Delete all Accounts from the database.
exports.delete = async function (req) {
    try {
        var user = await productsDao.delete(req);
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
        let request = {
            "name": req.name,
            "category_id": req.category_id,
            "description":req.description,
            "created_at": new Date()
        }

        var product = await productsDao.create(request, req);
       
        if(product) {
            console.log(product)
            return product;
        }
    } catch (e) {
        // Log Errors
        let errors = [];
        if (e instanceof ValidationError) {
            e.errors.forEach((item) => {
                errors.push({ 'field': item.path, 'message': item.message });
            })
            throw Error(JSON.stringify(errors))
        } else  { 
            for (const individualError of e.errors) {
                console.log(individualError.errors.errors);
                individualError.errors.errors.forEach((item) => {
                    errors.push({ 'field': item.path, 'message': item.message });
                })
            }
            throw Error(JSON.stringify(errors))
        }
    }
};

// // Create Accounts in the database.
exports.update = async function ( req, id) {
    try {
        var product = await productsDao.update(req, id);
        return product;
    } catch (e) {
        // Log Errors
        let errors = [];
        if (e instanceof ValidationError) {
            e.errors.forEach((item) => {
                errors.push({ 'field': item.path, 'message': item.message });
            })
            throw Error(JSON.stringify(errors))
        } else  { 
            for (const individualError of e.errors) {
                console.log(individualError.errors.errors);
                individualError.errors.errors.forEach((item) => {
                    errors.push({ 'field': item.path, 'message': item.message });
                })
            }
            throw Error(JSON.stringify(errors))
        }
    }
};
