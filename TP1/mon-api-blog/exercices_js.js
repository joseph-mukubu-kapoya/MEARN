// EXERCICE 2 : PRATIQUE DE JAVASCRIPT MODERNE (ES6+)

// 1. Déstructuration : Définissez un objet utilisateur et extrayez par déstructuration 
// son nom et son rôle, en renommant role en statut avec une valeur par défaut.
const utilisateur = { 
    id: 1, 
    nom: 'Ahmed', 
    role: 'Administrateur' 
};

// Extraction de 'nom' et 'role' (renommé en 'statut' avec 'Utilisateur' par défaut)
const { nom, role: statut = 'Utilisateur' } = utilisateur;

console.log('--- 1. Déstructuration ---');
console.log(`Nom: ${nom}, Statut: ${statut}`);


// 2. Immutabilité avec Spread : À partir d’un tableau initial, créez un nouveau tableau 
// enrichi d’un élément sans muter le tableau d’origine.
const tableauInitial = ['HTML', 'CSS', 'JavaScript'];
const nouveauTableau = [...tableauInitial, 'React'];

console.log('\n--- 2. Immutabilité avec Spread ---');
console.log('Tableau initial:', tableauInitial);
console.log('Nouveau tableau:', nouveauTableau);


// 3. Tableaux : Utilisez .filter() pour sélectionner les notes >= 15, puis 
// .map() pour afficher les noms en majuscules.
const etudiants = [
    { nom: 'Youssef', note: 16 },
    { nom: 'Aya', note: 18 },
    { nom: 'Karim', note: 11 },
    { nom: 'Mouna', note: 15 }
];

const nomsExcellentsEtudiants = etudiants
    .filter(etudiant => etudiant.note >= 15)
    .map(etudiant => etudiant.nom.toUpperCase());

console.log('\n--- 3. Méthodes de Tableaux (.filter et .map) ---');
console.log('Noms des étudiants ayant une note >= 15 (en majuscules) :', nomsExcellentsEtudiants);


// 4. Asynchronisme : Écrivez une fonction async / await avec gestion des erreurs 
// try...catch simulant une attente de données.
const simulerAppelAPI = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true; // Remplacer par false pour simuler une erreur
            if (success) {
                resolve({ message: 'Données reçues depuis l\'API simulée avec succès !' });
            } else {
                reject(new Error('Erreur de connexion au serveur !'));
            }
        }, 1500); // Attente de 1.5 secondes
    });
};

const fetchDonnees = async () => {
    console.log('\n--- 4. Asynchronisme (async/await) ---');
    console.log('Chargement des données en cours...');
    try {
        const resultat = await simulerAppelAPI();
        console.log('Succès :', resultat.message);
    } catch (erreur) {
        console.error('Erreur :', erreur.message);
    }
};

fetchDonnees();
