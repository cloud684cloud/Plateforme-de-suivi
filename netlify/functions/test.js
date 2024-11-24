// Utiliser require au lieu de import
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

// Configuration de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAXhAy1GfajC-7_6sKKkJOcFce8ODKROho",
  authDomain: "cloud-b8ee0.firebaseapp.com",
  projectId: "cloud-b8ee0",
  storageBucket: "cloud-b8ee0.firebasestorage.app",
  messagingSenderId: "451170177265",
  appId: "1:451170177265:web:eb4e7706fcd76342edd950",
  measurementId: "G-NE1G0P7SH9"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fonction Netlify
exports.handler = async function(event, context) {
  try {
    // Accéder à la collection 'test'
    const testCollection = collection(db, 'test');
    const snapshot = await getDocs(testCollection);
    const testData = snapshot.docs.map(doc => doc.data());

    // Retourner les données en réponse
    return {
      statusCode: 200,
      body: JSON.stringify(testData),
    };
  } catch (error) {
    console.error("Erreur lors de l'accès à Firestore:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erreur lors de la récupération des données' }),
    };
  }
};
