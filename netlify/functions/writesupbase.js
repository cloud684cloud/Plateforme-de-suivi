const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = 'https://ppwleozcqnrblxahxdwb.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

exports.handler = async function(event, context) {
  let todoText = '';

  // Check if event.body exists and is not empty
  if (event.body) {
    try {
      const { todoText: todo } = JSON.parse(event.body);  // Parsing the request body to get todoText
      todoText = todo;
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid JSON' }), // Return error if body is not valid JSON
      };
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'No todoText provided in the request body' }), // Error if body is missing
    };
  }

  // Function to add a new todo
  const addTodo = async (todoText) => {
    const { data, error } = await supabase
      .from('test')  // Replace 'test' with your table name
      .insert([{ text: todoText }]);  // Insert the new todo

    if (error) {
      console.error('Error inserting data:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error inserting data', error }), // Handle errors during insertion
      };
    } else {
      console.log('Todo added:', data);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Todo added successfully', data }), // Return success and data
      };
    }
  };

  // Await the addTodo function and return the response
  const response = await addTodo(todoText);
  return response;
};
