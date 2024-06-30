const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const basketController = require('../controllers/basketController')

router.use(authMiddleware)

router.get('/', authMiddleware, basketController.getById)
router.post('/create', authMiddleware, basketController.create)
router.post('/remove', authMiddleware, basketController.deleteOne)
router.post('/clear', authMiddleware, basketController.deleteAll)

module.exports = router