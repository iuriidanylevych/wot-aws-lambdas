'use strict'

const AWS = require('aws-sdk');
const uuid = require('uuid/v4');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'})

exports.handler = (event, context, callback) => {
    const { message } = JSON.parse(event.body);
    if (message) {
        const params = {
            Item: {
                _id: uuid(),
                date: Date.now(),
                message
            },
            TableName: 'messages'
        }
        docClient.put(params, (err, data) => {
            if (err) {
                callback(err, data);
            } else {
                const response = {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    statusCode: 200,
                    body: JSON.stringify({ ...params, ...data }),
                };
                callback(null, response);
            }
        });
    } else {
        callback('Error: No message provided', null);
    }
}