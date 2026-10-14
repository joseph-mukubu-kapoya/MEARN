const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes du domaine 'users'
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
