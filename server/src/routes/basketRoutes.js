const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const basketController = require('../controllers/basketController')

router.use(authMiddleware)

router.get('/', basketController.getById)
router.post('/create', basketController.create)
router.post('/remove', basketController.deleteOne)
router.post('/clear', basketController.deleteAll)

module.exports = router