const Discord = require('discord.js');
const client = new Discord.Client();

var toasters = [
  'https://media.giphy.com/media/71loenMVZGgN2/giphy.gif',
  'https://media.giphy.com/media/VWVthRb92CS8E/giphy.gif',
  'https://media.giphy.com/media/71loenMVZGgN2/giphy.gif',
  'https://media.giphy.com/media/7wUoPcTuC166s/giphy.gif',
  'https://media.giphy.com/media/EAvAOsVRNphfO/giphy.gif',
];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (message.content.startsWith('TOASTER')){
    message.channel.send({file: toasters[Math.floor(Math.random() * toasters.length)]});
  }
});

client.login(process.env.token);
