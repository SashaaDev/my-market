const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const upload = require('../config/multer');

router.get('/', productController.getAll)
router.get('/:id', productController.getById)
router.post('/create', upload.single('image'), productController.create);
router.put('/update/:id', productController.update);
router.delete('/delete/:id', productController.deleteOne);

module.exports = router