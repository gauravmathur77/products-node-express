const db = require("../database/mysql_connection");
const AccountsToken = db.accounts_token;
const Op = db.Sequelize.Op;


// Login.
exports.create = function (req) {
    return AccountsToken.create(req);
};

// Logout.
exports.updateToken = function (req) {
    return AccountsToken.update(
        { status: 0 },
        {
            where: {
                token: {
                    [Op.eq]: req
                }
            }
        }
    );
};

// Find User by Token.
exports.getUserbyToken = function (req) {
    return AccountsToken.findOne({
        where: {
            token: {
                [Op.eq]: req
            },
            status: {
                [Op.eq]: 1
            }
        },
        include: [
            {
                model: db.accounts,
                where: {
                    enabled: {
                        [Op.eq]: 1
                    }
                },
                include: [
                   { model: db.accounts_role}
                ]
            }
        ]
    }).then(data => {
        return data;
    })
};
