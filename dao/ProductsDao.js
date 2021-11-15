const db = require("../database/mysql_connection");
const Products = db.products;
const ProductsAttributes = db.products_attributes;
const Op = db.Sequelize.Op;


// Retrieve all Products from the database.
exports.findAll = function (req) {
    return Products.findAll({
        include: [{
            model: ProductsAttributes
        }]
    }).then(data => {
        return data;
    })
};

// Retrieve all Products from the database.
exports.findOne = function (req) {
    return Products.findAll({
        include: [{
            model: ProductsAttributes,
            where: {
                product_id: {
                    [Op.eq]: req
                }
            }
        }]
    }).then(data => {
        return data;
    })
};


// Delete all Products from the database.
exports.delete = function (req) {
    console.log(req)
    return Products.destroy({
        where: {
            id: {
                [Op.eq]: req
            }
        }
    }).then(data => {
        return data;
    })
};


// Create Products.
exports.create = async function (products, req) {
    return db.sequelize.transaction(function (t) {
        return Products.create(products, { transaction: t }).then(function (result) {
            let productAttrReq = [];
            req.attributes.forEach((item) => {
                productAttrReq.push({
                    "product_id": result.id,
                    "name": item.name,
                    "price": item.price,
                    "created_at": new Date()
                });
            });
            return ProductsAttributes.bulkCreate(productAttrReq, { transaction: t, validate: true });
        });
    }).then(function (result) {
        return result;

    }).catch(function (err) {
        throw err;
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
    });
};

// Create Products.
exports.update = function (req, id) {

    return db.sequelize.transaction(function (t) {
        return Products.update(req, {
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        }, { transaction: t })
        .then(function (result) {
            ProductsAttributes.destroy({
                where: {
                    product_id: {
                        [Op.eq]: id
                    }
                }
            }, { transaction: t })
            let productAttrReq = [];
            req.attributes.forEach((item) => {
                productAttrReq.push({
                    "product_id": id,
                    "name": item.name,
                    "price": item.price,
                    "created_at": new Date()
                });
            });
            return ProductsAttributes.bulkCreate(productAttrReq, { transaction: t, validate: true });
        });
    }).then(function (result) {
        return result;

    }).catch(function (err) {
        throw err;
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
    });
};
