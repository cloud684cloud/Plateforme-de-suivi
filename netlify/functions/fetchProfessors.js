const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.handler = async function () {
  const { data, error } = await supabase.from('prof').select('*');

  if (error) {
    console.error('Error fetching professors:', error);
    return { statusCode: 500, body: JSON.stringify({ message: 'Error fetching professors' }) };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ professors: data }),
  };
};
