const bcrypt = require('bcrypt');
const db = require("../database/mysql_connection");/**
 * Accounts Schema
 */
module.exports = (sequelize, DataTypes) => {
    const Categories = sequelize.define('categories', {
        id: {
            type: DataTypes.INTEGER,
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
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'categories'
    });

    Categories.associate = function (models) {
        // associations can be defined here
        Categories.hasMany(models.products, { foreignKey: 'id', targetKey: 'category_id' });
    };

    return Categories;
};
