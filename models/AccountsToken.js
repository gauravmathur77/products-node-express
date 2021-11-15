const db = require("../database/mysql_connection");
const Accounts = db.accounts;
/**
 * Accounts Token Schema
 */
module.exports = (sequelize, DataTypes) => {
    const AccountsToken = sequelize.define('accounts_token', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'accounts_token'
    });

    AccountsToken.associate = function (models) {
        // associations can be defined here        
        AccountsToken.belongsTo(models.accounts,{foreignKey: 'user_id', targetKey: 'id'});
    };
    return AccountsToken;
};
