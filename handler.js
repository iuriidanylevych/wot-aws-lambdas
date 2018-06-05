'use strict';

const addMessages = require('./handlers/addMessage').handler;
const getMessages = require('./handlers/getMessages').handler;

module.exports.add_messages = addMessages;
module.exports.get_messages = getMessages;
