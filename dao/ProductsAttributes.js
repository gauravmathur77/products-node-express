const db = require("../database/mysql_connection");
const ProductsAttributes = db.products_attributes;
const Op = db.Sequelize.Op;


// // Retrieve all Products from the database.
// exports.findAll = function (req) {
//     return Products.findAll({
//         where: {
//             enabled: {
//                 [Op.eq]: 1
//             }
//         }
//     }).then(data => {
//         return data;
//     })
// };

// // Retrieve all Products from the database.
// exports.findOne = function (req) {
//     return Products.findOne({
//         where: {
//             enabled: {
//                 [Op.eq]: 1
//             },
//             id: {
//                 [Op.eq]: req
//             }
//         }
//     }).then(data => {
//         return data;
//     })
// };


// // Delete all Products from the database.
// exports.delete = function (req) {
//     console.log(req)
//     return Products.destroy({
//         where: {
//             id: {
//                 [Op.eq]: req
//             }
//         }
//     }).then(data => {
//         return data;
//     })
// };


// Create Products.
exports.create = function (req) {
    return ProductsAttributes.bulkCreate(req);
};

// // Create Products.
// exports.update = function (req, id) {
//     console.log('req', req)
//     return Products.update(
//         req,
//         {
//             where: {
//                 id: {
//                     [Op.eq]: id
//                 }
//             }
//         }
//     );
// };
