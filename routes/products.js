const express = require('express')
const router = express.Router()

const {getProductsAll,getProductsStatic} = require('../controllers/products')

router.route('/').get(getProductsAll)
router.route('/static').get(getProductsStatic)

module.exports = router
