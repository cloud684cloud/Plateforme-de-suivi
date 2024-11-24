// firebaseInit.js
const admin = require("firebase-admin");


// Utilisez le chemin absolu vers le fichier serviceAccountKey.json à la racine
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Fonction pour initialiser Firebase i ce n'est pas déjà fait
const initializeFirebase = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
};

module.exports = initializeFirebase;
