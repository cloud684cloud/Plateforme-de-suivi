const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client with environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Function to fetch the parent ID based on the token
exports.handler = async function(event, context) {
  // Check if the method is GET
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  // Get the token from the query parameters
  const token = event.queryStringParameters.token;

  // Check if the token is provided
  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Token is required' }),
    };
  }

  // Fetch the parent ID from the Supabase database using the token
  const { data, error } = await supabase
    .from('parent') // Table name
    .select('id_parent')  // Select the parent ID column
    .eq('token_auth', token) // Compare the token
    .single(); // Get only one row

  // Handle error if any
  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching parent data', error }),
    };
  }

  // If the parent is found, return the ID
  if (data) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Parent found', parentId: data.id_parent }), // Return the 'id_parent'
    };
  }

  // If no parent is found for the given token
  return {
    statusCode: 404,
    body: JSON.stringify({ message: 'Parent not found for the given token' }),
  };
};
