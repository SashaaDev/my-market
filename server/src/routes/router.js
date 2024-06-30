const express = require('express')
const router = express.Router()
const userRoutes = require('./userRoutes')
const productRoutes = require('./productRoutes')
const basketRoutes = require('./basketRoutes')

router.use('/user', userRoutes)
router.use('/product', productRoutes)
router.use('/basket', basketRoutes)
module.exports = router