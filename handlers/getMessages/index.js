'use strict'

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'})

module.exports.handler = (event, context, callback) => {
    const params = {
        TableName: 'messages',
        Limit: 100
    }
    docClient.scan(params, (err, data) => {
        if (err) {
            callback(err, data);
        } else {
            const response = {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                statusCode: 200,
                body: JSON.stringify(data),
            };
            callback(null, response);
        }
    });
}