const bcrypt = require('bcrypt');
const db = require("../database/mysql_connection");/**
 * Accounts Schema
 */
module.exports = (sequelize, DataTypes) => {
    const ProductsAttributes = sequelize.define('products_attributes', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter Product ID'
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
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter Price'
                }
            }
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'products_attributes'
    });

    ProductsAttributes.associate = function (models) {
        // associations can be defined here        
        ProductsAttributes.belongsTo(models.products,{foreignKey: 'product_id', targetKey: 'id'});
    };

    return ProductsAttributes;
};
