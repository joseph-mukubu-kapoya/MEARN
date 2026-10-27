const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  updatePassword,
  updateUserRole
} = require('../controllers/userController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

// Routes d'authentification publiques
router.post('/register', registerUser);
router.post('/login', loginUser);

// Exercice 1 : Mise a jour securisee du mot de passe (utilisateur connecte)
router.put('/update-password', protect, updatePassword);

// Route privee protegee par Token JWT
router.get('/profile', protect, getUserProfile);

// Exercice 2 : Elevation de role (admin uniquement)
router.put('/:id/role', protect, adminOnly, updateUserRole);

// Route reservee aux administrateurs (JWT valide + role admin requis)
router.get('/', protect, adminOnly, getAllUsers);

module.exports = router;
