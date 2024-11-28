const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.handler = async function (event) {
  const { token } = JSON.parse(event.body); // Assuming token is sent in the request body

  if (!token) {
    return { statusCode: 400, body: JSON.stringify({ message: 'Token is required' }) };
  }

  // Check if a parent with the same token already exists
  const { data, error } = await supabase
    .from('parent')
    .select('*')
    .eq('token', token)
    .single(); // .single() to get only one matching row

  if (error) {
    console.error('Error checking parent:', error);
    return { statusCode: 500, body: JSON.stringify({ message: 'Error checking parent' }) };
  }

  // If a parent with the same token exists, do nothing
  if (data) {
    return { statusCode: 200, body: JSON.stringify({ message: 'Parent already exists' }) };
  }

  // Insert new parent if no matching token is found
  const { insertError } = await supabase.from('parent').insert([{ token }]);

  if (insertError) {
    console.error('Error inserting parent:', insertError);
    return { statusCode: 500, body: JSON.stringify({ message: 'Error inserting parent' }) };
  }

  return {
    statusCode: 201,
    body: JSON.stringify({ message: 'Parent added successfully' }),
  };
};
