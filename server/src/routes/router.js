const express = require('express')
const router = express.Router()
const userRoutes = require('./userRoutes')
const productRoutes = require('./productRoutes')
const basketRoutes = require('./basketRoutes')
const orderRoutes = require('./orderRoutes')

router.use('/user', userRoutes)
router.use('/product', productRoutes)
router.use('/basket', basketRoutes)
router.use('/order', orderRoutes)

module.exports = router