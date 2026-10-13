const { estNonVide, estEmailValide } = require('../utils/validators');

// Données en mémoire des utilisateurs (SoC)
let users = [
    { id: 1, name: 'Alice Dupont', email: 'alice@example.com', role: 'admin' },
    { id: 2, name: 'Bob Martin', email: 'bob@example.com', role: 'redacteur' }
];
let prochainUserId = 3;

// 1. Récupérer tous les utilisateurs (avec filtre optionnel ?role=...)
const getAllUsers = (req, res) => {
    const { role } = req.query;
    let resultat = users;
    if (role) {
        resultat = users.filter(u => u.role === role);
    }
    res.status(200).json({ total: resultat.length, users: resultat });
};

// 2. Récupérer un utilisateur par son ID
const getUserById = (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ error: `Utilisateur ${id} introuvable` });
    }
    res.status(200).json(user);
};

// 3. Créer un nouvel utilisateur avec validation
const createUser = (req, res) => {
    const { name, email, role = 'visiteur' } = req.body;

    if (!estNonVide(name)) {
        return res.status(400).json({ error: "Le nom d'utilisateur est obligatoire et ne doit pas être vide." });
    }

    if (!estEmailValide(email)) {
        return res.status(400).json({ error: "L'adresse email est invalide (doit être une chaîne contenant '@' et '.')." });
    }

    const nouvelUtilisateur = {
        id: prochainUserId++,
        name: name.trim(),
        email: email.trim(),
        role
    };

    users.push(nouvelUtilisateur);
    res.status(201).json({ message: 'Utilisateur créé avec succès', user: nouvelUtilisateur });
};

// 4. Supprimer un utilisateur
const deleteUser = (req, res) => {
    const id = Number(req.params.id);
    const userExiste = users.some(u => u.id === id);
    if (!userExiste) {
        return res.status(404).json({ error: `Impossible de supprimer : utilisateur ${id} introuvable` });
    }

    users = users.filter(u => u.id !== id);
    res.status(200).json({ message: `Utilisateur ${id} supprimé avec succès` });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser
};
