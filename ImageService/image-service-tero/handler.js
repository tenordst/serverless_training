'use strict';
const AWS = require('aws-sdk');
const client = new AWS.Rekognition();

module.exports.analyzeImage = async event => {
  console.log('Received event for file, content ' + JSON.stringify(event));
  const params = {
    Image: {
      S3Object: {
        Bucket: event.Records[0].s3.bucket.name,
        Name: event.Records[0].s3.object.key,
      },
    },
    MaxLabels: 10,
    MinConfidence: 70,
  }

  console.log('Analyzing file, bucket ' + params.Image.S3Object.Bucket + ', name ' + params.Image.S3Object.Name);

  try {
    var result = await client.detectLabels(params).promise();
    console.log('Result ' + JSON.stringify(result));
  } catch (e) {
    console.error('Label detect failed, error ' + e);
  }
};
