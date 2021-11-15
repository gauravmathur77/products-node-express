const express = require('express'),
    jwtMiddleware = require('../middleware/jwtAuthentication'),
    roles = require('../constants/roles.json'),
    products = require("../controllers/ProductsController");
var router = express.Router();


router.get("/", products.findAll)

router.get("/:id", products.findOne)

router.delete("/:id", products.delete)

router.post("/", products.createProduct)

router.put("/:id", products.updateAccount)

module.exports = router;


