const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const upload = require('../config/multer');

router.get('/', productController.getAll)
router.get('/:id', productController.getById)
router.post('/create', upload.single('image'), productController.createProduct);
router.put('/update/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router