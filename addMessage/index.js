'use strict'

console.log('starting addMessage lambda');

const AWS = require('aws-sdk');
const uuid = require('uuid/v4');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'})

exports.handler = (event, context, callback) => {
    if (event.message) {
        const params = {
            Item: {
                _id: uuid(),
                date: Date.now(),
                message: event.message
            },
            TableName: 'messages'
        }
        docClient.put(params, (err, data) => {
            if (err) {
                callback(err, data);
            } else {
                callback(null, { ...params, ...data });
            }
        });
    } else {
        callback('Error: No message provided', null);
    }
}