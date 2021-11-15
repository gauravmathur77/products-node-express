const bcrypt = require('bcrypt');
const db = require("../database/mysql_connection");/**
 * Accounts Schema
 */
module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define('products', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter Category'
                }
            }
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
        tableName: 'products'
    });

    Products.associate = function (models) {
        // associations can be defined here        
        Products.belongsTo(models.categories,{foreignKey: 'category_id', targetKey: 'id'});
        Products.hasMany(models.products_attributes, { foreignKey: 'product_id', targetKey: 'id' });
    };

    return Products;
};
