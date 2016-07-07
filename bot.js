let util = require('util');
let http = require('http');
let random = require('rng');
let Bot  = require('@kikinteractive/kik');

// Configure the bot API endpoint, details for your bot
let bot = new Bot({
    username: 'LikelyBot',
    apiKey: 'aa1f0716-387b-4649-b039-4acba079bbd4',
    baseUrl: 'likely-bot.herokuapp.com'
});

bot.updateBotConfiguration();

bot.onTextMessage((message) => {
    message.reply('It is ' + (Math.floor(Math.random() * 100) + 1) + '% likely');
});

// Set up your server and start listening
let server = http
  .createServer(bot.incoming())
  .listen(process.env.PORT || 8080);
