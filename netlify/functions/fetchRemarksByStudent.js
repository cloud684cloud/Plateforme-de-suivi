const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.handler = async function (event) {
  const studentId = event.queryStringParameters.studentId; // Récupérer l'id de l'élève depuis les paramètres de la requête

  if (!studentId) {
    return { statusCode: 400, body: JSON.stringify({ message: 'studentId is required' }) };
  }

  const { data, error } = await supabase
    .from('remarque')
    .select('*')
    .eq('id_eleve', studentId);

  if (error) {
    console.error('Error fetching remarks:', error);
    return { statusCode: 500, body: JSON.stringify({ message: 'Error fetching remarks' }) };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ remarks: data }),
  };
};
