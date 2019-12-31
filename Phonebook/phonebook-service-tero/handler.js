'use strict';

module.exports.fetch = async event => {
  console.log('Received event, content ' + JSON.stringify(event));
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        name: event.queryStringParameters.name,
        number: '+358408073984',
      },
    ),
  };
};
