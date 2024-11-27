const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialisation du client Supabase avec les variables d'environnement
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Fonction qui ajoute un parent
exports.handler = async function(event, context) {
  // Vérifier que la méthode HTTP est POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  // Récupérer les données envoyées dans le body de la requête
  const { token, name, phone, email } = JSON.parse(event.body);

  // Vérification du champ 'token' nécessaire
  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Token is required' }),
    };
  }

  // Ajouter le parent à la base de données Supabase
  const { data, error } = await supabase
    .from('parent') // Assurez-vous que la table 'parent' existe dans votre base de données
    .insert([
      {
        nom: name || null, // Utiliser null si 'name' est non fourni
        telephone: phone || null, // Utiliser null si 'phone' est non fourni
        email: email || null, // Utiliser null si 'email' est non fourni
        token_auth: token, // Vous pouvez également ajouter d'autres champs ici
      },
    ]);

  // Vérification des erreurs lors de l'insertion
  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error inserting parent', error }),
    };
  }

  // Si tout est correct, retourner le parent inséré
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Parent added successfully', data }),
  };
};
