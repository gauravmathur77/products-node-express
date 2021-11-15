const db = require("../database/mysql_connection");
const Accounts = db.accounts;
const Op = db.Sequelize.Op;


// Retrieve all Accounts from the database.
exports.findAll = function (req) {
    return Accounts.findAll({
        where: {
            enabled: {
                [Op.eq]: 1
            }
        }
    }).then(data => {
        return data;
    })
};

// Retrieve all Accounts from the database.
exports.findOne = function (req) {
    return Accounts.findOne({
        where: {
            enabled: {
                [Op.eq]: 1
            },
            id: {
                [Op.eq]: req
            }
        }
    }).then(data => {
        return data;
    })
};


// Delete all Accounts from the database.
exports.delete = function (req) {
    console.log(req)
    return Accounts.destroy({
        where: {
            id: {
                [Op.eq]: req
            }
        }
    }).then(data => {
        return data;
    })
};


// Create Accounts.
exports.create = function (req) {
    return Accounts.create(req);
};

// Create Accounts.
exports.update = function (req, id) {
    console.log('req', req)
    return Accounts.update(
        req,
        {
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        }
    );
};

// Retrieve all Accounts from the database.
exports.findByUsername = function (req) {
    return Accounts.findOne({
        where: {
            enabled: {
                [Op.eq]: 1
            },
            name: {
                [Op.eq]: req
            }
        }
    }).then(data => {
        return data;
    })
};