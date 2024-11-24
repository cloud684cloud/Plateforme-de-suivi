const admin = require("firebase-admin");
const initializeFirebase = require("./firebaseInit"); // Ensure correct path

exports.handler = async function(event, context) {
  initializeFirebase();  // Initialize Firebase
  try {
    const snapshot = await admin.firestore().collection('test').get();
    const data = snapshot.docs.map(doc => doc.data());
    console.log('Fetched data:', data);  // Log fetched data
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error fetching data:', error);  // Log any errors
    return {
      statusCode: 500,
      body: `Error fetching data: ${error.message}`
    };
  }
};
