'use strict';

module.exports.analyzeImage = (event, context, _callback) => {
  console.log('Received event for file, content ' + JSON.stringify(event));
  console.log('Context ' + JSON.stringify(context));
};
