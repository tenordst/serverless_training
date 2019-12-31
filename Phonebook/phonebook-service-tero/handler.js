'use strict';

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

module.exports.fetch = async (event, _context, callback) => {
  console.log('Received event, content ' + JSON.stringify(event));

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
      body: JSON.stringify(result.Item)
    });
  } catch (e) {
    console.log('Error ' + JSON.stringify(e));
    callback(null, { 
      statusCode: 500, 
      body: JSON.stringify(e)
    });
  }
};
