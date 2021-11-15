const express = require('express'),
    login = require("../controllers/LoginController");
var router = express.Router();


router.post("/login", login.login)

router.post("/logout", login.logout)

module.exports = router;