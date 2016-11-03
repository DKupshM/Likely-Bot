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
	baseUrl: 'https://likely-bot.herokuapp.com'
});

bot.updateBotConfiguration();

function instantReply(message){
	message.reply("Hmm... Let Me Think...");
}

//Send back message
function processTextMessage(message, callback){
       callback(null, 'It is ' + (Math.floor(Math.random() * 100) + 1) + '% likely');
}

function wait()
{
}

bot.onTextMessage((message) => {
	 
	// Log The Message in console for debug
	
	console.log('Message From:', message.from);
	console.log('Message Viewers:', message.participants);
	console.log('Message Body:', message.body);
	
	instantReply(message);
	// Process Message
	
	setTimeout(wait, 3000);
	
	processTextMessage(message.body, function(err, response){
		//Log Message
		console.log('Message Response:', response);
		
		//Reply
		message.reply(response);
	});
});



app.get('/', function(req, res){
	res.send('Hello. This is a kik bot to say the changes. Do @likelybot on kik to use.');
});

app.get('/message', function(req, res){

	processTextMessage(req.query.message, function(err, response){
		res.send(response);
	});
});

 
app.use(bot.incoming());

app.listen(process.env.PORT || 8080, function(){
	console.log('Server started on port ' + (process.env.PORT || 8080));
});
