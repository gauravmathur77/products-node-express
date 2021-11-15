const bcrypt = require('bcrypt');
const db = require("../database/mysql_connection");
/**
 * Accounts Schema
 */
module.exports = (sequelize, DataTypes) => {
    const AccountsRole = sequelize.define('accounts_role', {
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
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'accounts_role'
    });

    
    AccountsRole.associate = function (models) {
        // associations can be defined here
        AccountsRole.belongsTo(models.accounts, { foreignKey: 'user_id', targetKey: 'id' });
    };

    return AccountsRole;
};
