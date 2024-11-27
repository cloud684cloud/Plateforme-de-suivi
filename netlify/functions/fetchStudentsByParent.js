const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.handler = async function (event) {
  const parentId = event.queryStringParameters.parentId; // Récupérer l'id du parent depuis les paramètres de la requête

  if (!parentId) {
    return { statusCode: 400, body: JSON.stringify({ message: 'parentId is required' }) };
  }

  const { data, error } = await supabase
    .from('eleve')
    .select('*')
    .eq('id_parent', parentId);

  if (error) {
    console.error('Error fetching students:', error);
    return { statusCode: 500, body: JSON.stringify({ message: 'Error fetching students' }) };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ students: data }),
  };
};
