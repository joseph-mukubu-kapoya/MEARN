const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// 1. Activer le décodage du corps JSON
app.use(express.json());

// 2. Middleware pour afficher les requêtes dans la console
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl}`);
    next(); // Toujours appeler next() pour continuer !
});

// Liste d'articles stockée en mémoire
const articles = [
    { id: 1, title: 'Introduction a la Stack MERN', author: 'Admin' },
    { id: 2, title: 'Comprendre l Asynchronisme', author: 'Admin' }
];

// Route GET racine
app.get('/', (req, res) => {
    res.status(200).send('<h1>API Blog MERN operationnelle</h1>');
});

// Route GET : Consulter tous les articles
app.get('/api/articles', (req, res) => {
    res.status(200).json({
        total: articles.length,
        articles
    });
});

// Route POST : Ajouter un nouvel article
app.post('/api/articles', (req, res) => {
    const { title, author = 'Anonyme' } = req.body;

    // Vérifier la présence du titre
    if (!title) {
        return res.status(400).json({
            error: 'Le titre de l article est obligatoire.'
        });
    }

    const newArticle = {
        id: Date.now(),
        title,
        author
    };

    articles.push(newArticle);

    return res.status(201).json({
        message: 'Article cree avec succes !',
        article: newArticle
    });
});

// ==========================================
// EXERCICE 1 : EXTENSION DU SERVEUR
// ==========================================

// 1. Route GET /about renvoyant le nom de l’application, l’institution et la version.
app.get('/about', (req, res) => {
    res.status(200).json({
        appName: 'API Blog MERN',
        institution: 'Mon Institution',
        version: '1.0.0'
    });
});

// 2. Route GET /api/users retournant une liste d’utilisateurs factices avec nom et email.
app.get('/api/users', (req, res) => {
    const users = [
        { nom: 'Ali', email: 'ali@example.com' },
        { nom: 'Sara', email: 'sara@example.com' },
        { nom: 'Youssef', email: 'youssef@example.com' }
    ];
    res.status(200).json(users);
});

// 3. Route POST /contact recevant { email, message }
app.post('/contact', (req, res) => {
    const { email, message } = req.body;

    // Si l'un des deux champs est vide, renvoyez une erreur HTTP 400 Bad Request.
    if (!email || !message) {
        return res.status(400).json({
            error: 'Les champs email et message sont obligatoires.'
        });
    }

    // Si les données sont correctes, renvoyez un message de confirmation avec le statut 200 OK.
    res.status(200).json({
        message: 'Message reçu avec succès !'
    });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur disponible sur http://localhost:${PORT}`);
});
