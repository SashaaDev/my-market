const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')

router.get('/',orderController.getAll)
router.get('/:id',orderController.getById)
router.post('/create', orderController.create)
router.patch('/update/:id', orderController.updateStatus)
router.delete('/delete/:id', orderController.deleteOne)

module.exports = router