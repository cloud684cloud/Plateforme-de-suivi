const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.handler = async function () {
  const { data, error } = await supabase.from('parent').select('*');

  if (error) {
    console.error('Error fetching parents:', error);
    return { statusCode: 500, body: JSON.stringify({ message: 'Error fetching parents' }) };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ parents: data }),
  };
};
