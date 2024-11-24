const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Replace these with your actual URL and anon key
const SUPABASE_URL = 'https://ppwleozcqnrblxahxdwb.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_KEY;

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

exports.handler = async function(event, context) {
    // Function to fetch data from the 'test' table
    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from('test')  // Replace 'test' with your table name
        .select('*');  // Fetch all rows from the table
  
      if (error) {
        console.error('Error fetching data:', error);
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Error fetching data' }),
        };
      } else {
        console.log('Todos fetched:', data);
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Data fetched successfully', data }),
        };
      }
    };
  
    // Call the fetchTodos function and return the response
    const response = await fetchTodos();
    return response;
  };