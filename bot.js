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
    baseUrl: 'likely-bot.herokuapp.com'
});

function processTextMessage(message, callback){
    console.log('Got Message:', message.body);
    console.log('Sent by', message.from);
    console.log('Group Participants', message.participants);
    console.log('Timestamp', message.timestamp);

    callback(null, 'It is ' + (Math.floor(Math.random() * 100) + 1) + '% likely’);
}

bot.onTextMessage((message) => {
    processTextMessage(message, function(err, response){
		message.reply(response);
   });
});

app.get('/', function(req, res){
	res.send('Hello. This is a demo Kik chatbot. Visit @likelybot in Kik.');
});

app.get('/message', function(req, res){
	console.log(req.query);
	processTextMessage(req.query.message, function(err, response){
		res.send(response);
	});
});

app.use(bot.incoming());

// Set up your server and start listening
app.listen(process.env.PORT || 8080, function(){
	console.log('Server started on port ' + (process.env.PORT || 8080));
});
