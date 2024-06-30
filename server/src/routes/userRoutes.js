const userController = require('../controllers/userController')
const express = require('express');
const router = express.Router();

router.post('/registration', userController.register)
router.post('/login', userController.login)
router.get('/:id', userController.getById)
router.get('/', userController.getAll)
router.put('/:id', userController.update)

module.exports = router;
