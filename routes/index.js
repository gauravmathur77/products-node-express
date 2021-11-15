

const router = require('express').Router();

router.use('/', require('./home'));

router.use('/users', require('./users'));

router.use('/accounts', require('./accounts'));

router.use('/auth', require('./login'));

router.use('/products', require('./products'));

module.exports = router;
