const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.handler = async function(event, context) {
  // Check if the method is POST (for adding a parent)
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  // Get the token from the body (assuming it's a JSON body)
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid JSON body' }),
    };
  }

  const { token } = body;

  // Check if the token is provided
  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Token is required' }),
    };
  }

  // Step 1: Check if a parent with the same token already exists
  const { data, error } = await supabase
    .from('parent')
    .select('id_parent')
    .eq('token_auth', token)
    .single(); // Get a single record if it exists

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching parent data', error }),
    };
  }

  // Step 2: If the parent exists, do nothing and return a message
  if (data) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Parent with this token already exists' }),
    };
  }

  // Step 3: If the parent does not exist, insert a new record
  const { insertError } = await supabase
    .from('parent')
    .insert([{ token_auth: token }]);

  if (insertError) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error inserting parent', insertError }),
    };
  }

  return {
    statusCode: 201,
    body: JSON.stringify({ message: 'Parent added successfully' }),
  };
};
