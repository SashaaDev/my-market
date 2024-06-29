const userController = require('../controllers/userController')
const express = require('express');
const router = express.Router();

router.post('/registration', userController.register)
router.post('/login', userController.login)
router.get('/:id', userController.getUserById)
router.get('/', userController.getAllUsers)
router.put('/:id', userController.updateUser)

module.exports = router;
