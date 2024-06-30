const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
const ROLES = require('../constants/userRoles')
const checkRole = require('../middlewares/checkRoleMiddleware')

router.get('/', checkRole(ROLES.MANAGER), orderController.getAll)
router.get('/:id', orderController.getById)
router.post('/create', orderController.create)
router.patch('/update/:id', checkRole(ROLES.MANAGER), orderController.updateStatus)
router.delete('/delete/:id', checkRole(ROLES.ADMIN), orderController.deleteOne)

module.exports = router