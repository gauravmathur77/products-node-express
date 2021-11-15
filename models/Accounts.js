const bcrypt = require('bcrypt');
const db = require("../database/mysql_connection");
const AccountsToken = db.accounts_token;
/**
 * Accounts Schema
 */
module.exports = (sequelize, DataTypes) => {
    const Accounts = sequelize.define('accounts', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Name already in use!'
            },
            validate: {
                notNull: {
                    msg: 'Please enter Name'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter password'
                },
                len: {
                    args: [4, 10],
                    msg: "String length is not in this range"
                }
            }
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter enabled'
                }
            }
        },
        token: {
            type: DataTypes.VIRTUAL
        }
    }, {
        timestamps: false
    });

    Accounts.afterValidate(async (accounts, options) => {
        console.log('asdsd', accounts)
        let hash = bcrypt.hashSync(accounts.password, 10);
        accounts.password = hash;
    });
    
    Accounts.associate = function (models) {
        // associations can be defined here
        Accounts.hasMany(models.accounts_token, { foreignKey: 'id', targetKey: 'user_id' });
        Accounts.hasOne(models.accounts_role, { foreignKey: 'id', targetKey: 'user_id' });
    };

    return Accounts;
};
