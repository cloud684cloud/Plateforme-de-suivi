// netlify/functions/test.js

require('dotenv').config(); // Make sure to load local .env during local development
const admin = require('firebase-admin');

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID, // Use process.env for env variables
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Ensure proper formatting
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};
console.log('Service Account:', JSON.stringify(serviceAccount, null, 2));
console.log(process.env.FIREBASE_PRIVATE_KEY);
console.log(process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'));


// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Example function to interact with Firestore
exports.handler = async function(event, context) {
  const db = admin.firestore();
  try {
    const snapshot = await db.collection('test').get();
    if (snapshot.empty) {
      console.log('No documents found.');
    } else {
      const data = snapshot.docs.map(doc => doc.data());
      console.log('Documents fetched:', JSON.stringify(data, null, 2));
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Function executed successfully' }),
    };
  } catch (error) {
    console.error('Error accessing Firestore:', JSON.stringify(error, null, 2));
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error accessing Firestore' }),
    };
  }
};
