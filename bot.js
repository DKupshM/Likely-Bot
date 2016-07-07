'use strict';

let express = require('express');
let util = require('util');
let http = require('http');
let Bot  = require('@kikinteractive/kik');
let request = require('request');
let getenv = require('getenv');

var app = express();

// Configure the bot API endpoint, details for your bot
let bot = new Bot({
    username: getenv('KIK_USERNAME'),
    apiKey: getenv('KIK_APIKEY'),
    baseUrl: 'kik-echobot.ngrok.io'
});

bot.updateBotConfiguration();

bot.onTextMessage((message) => {
    message.reply('It is ' + (Math.floor(Math.random() * 100) + 1) + '% likely');
    console.log('Got Message:', message.body);
    console.log('Sent by', message.from);
    console.log('Group Participants', message.participants);
    console.log('Timestamp', message.timestamp);
});

app.use(bot.incoming());

// Set up your server and start listening
app.listen(process.env.PORT || 8080, function(){
	console.log('Server started on port ' + (process.env.PORT || 8080));
});
