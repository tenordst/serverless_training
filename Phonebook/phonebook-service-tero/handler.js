'use strict';

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

module.exports.fetch = async (event, _context, callback) => {
  console.log('Fetch, received event, content ' + JSON.stringify(event));

  // Create DynamoDB document client
  var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

  // Define parameters for DynamoDB get operation
  var params = {
    TableName: process.env.PHONEBOOK_TABLE,
    Key: {'name': event.queryStringParameters.name}
  };

  try {
    var result = await docClient.get(params).promise();
    console.log('Result for DynamoDB get ' + JSON.stringify(result.Item));
    callback(null, { 
      statusCode: 200, 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result.Item)
    });
  } catch (e) {
    console.log('Error ' + JSON.stringify(e));
    callback(null, { 
      statusCode: 500, 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(e)
    });
  }
};

module.exports.post = async (event, _context, callback) => {
  console.log('Post, received event, body ' + JSON.stringify(JSON.parse(event.body)));

  // Create DynamoDB document client
  var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

  var params = {
    TableName : process.env.PHONEBOOK_TABLE,
    Item: JSON.parse(event.body),
  };
  
  try {
    var result = await docClient.put(params).promise();
    console.log('Result for DynamoDB put ' + JSON.stringify(result));
    callback(null, { 
      statusCode: 200, 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    });
  } catch (e) {
    console.log('Error ' + JSON.stringify(e));
    callback(null, { 
      statusCode: 500, 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(e)
    });
  }
};

