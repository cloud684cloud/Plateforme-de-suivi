
require('dotenv').config();
const admin = require('firebase-admin');


const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Example function to interact with Firestore
async function testFirebaseConnection() {
  const db = admin.firestore();
  try {
    const snapshot = await db.collection('test').get();
    if (snapshot.empty) {
      console.log('No documents found.');
    } else {
      const data = snapshot.docs.map(doc => doc.data());
      // Log the data fetched with JSON.stringify to view the structure clearly
      console.log('Documents fetched:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error('Error accessing Firestore:', JSON.stringify(error, null, 2));
  }
}

// Run the function
testFirebaseConnection();
