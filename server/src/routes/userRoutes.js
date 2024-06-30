const userController = require('../controllers/userController')
const express = require('express');
const router = express.Router();

router.get('/', userController.getAll)
router.get('/:id', userController.getById)
router.post('/registration', userController.register)
router.post('/login', userController.login)
router.put('/update/:id', userController.update)

module.exports = router;
