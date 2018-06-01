'use strict'

console.log('starting getMessages lambda');

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'})

exports.handler = (event, context, callback) => {
    const params = {
        TableName: 'messages',
        Limit: 100
    }
    docClient.scan(params, (err, data) => {
        if (err) {
            callback(err, data);
        } else {
            callback(null, data);
        }
    });
}