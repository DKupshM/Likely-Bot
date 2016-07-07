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

function processTextMessage(message, callback){
	
		callback(null, 'It is ' + (Math.floor(Math.random() * 100) + 1) + '% likely');
}


bot.onTextMessage((message) => {
	console.log('Message Received: ', message);
	processTextMessage(message.body, function(err, response){
		message.reply(response);
	});
});



app.get('/', function(req, res){
	res.send('Hello. This is a kik bot. Do @likelybot on kik to use.');
});


/**
 * @param message {query param}
 */
app.get('/message', function(req, res){
	console.log(req.query);
	processTextMessage(req.query.message, function(err, response){
		res.send(response);
	});
});

 
app.use(bot.incoming());

app.listen(process.env.PORT || 8080, function(){
	console.log('Server started on port ' + (process.env.PORT || 8080));
});
