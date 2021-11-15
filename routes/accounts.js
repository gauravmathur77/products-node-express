const express = require('express'),
    jwtMiddleware = require('../middleware/jwtAuthentication'),
    roles = require('../constants/roles.json'),
    accounts = require("../controllers/AccountsController");
var router = express.Router();


router.get("/", jwtMiddleware(roles.USER,roles.ADMIN), accounts.findAll)

router.get("/:id", jwtMiddleware(roles.USER,roles.ADMIN), accounts.findOne)

router.delete("/:id", jwtMiddleware(roles.ADMIN), accounts.delete)

router.post("/", jwtMiddleware(roles.ADMIN), accounts.createAccount)

router.put("/:id", jwtMiddleware(roles.ADMIN), accounts.updateAccount)

module.exports = router;


