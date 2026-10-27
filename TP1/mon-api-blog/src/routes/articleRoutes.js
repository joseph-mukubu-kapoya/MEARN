const express = require('express');
const router = express.Router();
const {
  getAllArticles,
  getArticleById,
  createArticle,
  getMyArticles,
  updateArticle,
  deleteArticle
} = require('../controllers/articleController');
const { protect } = require('../middlewares/authMiddleware');

// Consultation publique
router.get('/', getAllArticles);

// Exercice 2 : Route des articles personnels (avant /:id pour eviter conflit de chemin)
router.get('/my-articles', protect, getMyArticles);

// Consultation publique par ID
router.get('/:id', getArticleById);

// Operations d'ecriture protegees par authentification JWT
router.post('/', protect, createArticle);
router.put('/:id', protect, updateArticle);
router.delete('/:id', protect, deleteArticle);

module.exports = router;
