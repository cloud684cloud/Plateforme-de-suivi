// netlify/functions/hello.js
const { json } = require('@netlify/functions');


exports.handler = async (event, context) => {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Hello World!' })
    };
  };
  