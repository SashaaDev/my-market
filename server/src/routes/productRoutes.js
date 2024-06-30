const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const upload = require('../config/multer');
const checkRole = require('../middlewares/checkRoleMiddleware')
const ROLES = require('../constants/userRoles')

router.get('/', productController.getAll)
router.get('/:id', productController.getById)
router.post('/create', checkRole(ROLES.ADMIN), upload.single('image'), productController.create);
router.put('/update/:id', checkRole(ROLES.ADMIN), productController.update);
router.delete('/delete/:id', checkRole(ROLES.ADMIN), productController.deleteOne);

module.exports = router