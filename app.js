const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("for e$help", {type: "WATCHING"});
});

client.on('message', message => {
    let args = message.content.split(" ").splice(1);
    let m = message.content.toLowerCase();
    if (message.author === client.user) {return;}
    if (message.content.startsWith('e$help')) {
      message.channel.send({embed: {
        title: 'EmojiRestrictBot Help',
        color: 0xf1c40f,
        fields: [
          {name: 'e$add', value: 'Adds a restricted role.\nUsage: `e$add 😛 @Role`'},
          {name: 'e$remove', value: 'Removes a restricted role.\nUsage: `e$remove 😛 @Role`'},
          {name: 'e$invite', value: 'Provides you with the bot invite link.\nUsage: `e$invite`'},
          {name: 'e$vote', value: 'Provides you with a link to vote up the bot on DiscordBots.org.\nUsage: `e$vote`'},
        ],
        footer: {
          text: 'To add restricted roles you must have the Manage Emojis permission.'
        },
      }});
    }
    if (message.content.startsWith('e$invite')) {
      message.channel.send({embed: {
        title: 'Invite Link',
        color: 0xf1c40f,
        description: '[Invite me to your server](https://discordapp.com/oauth2/authorize?client_id=545069699570860032&scope=bot&permissions=1074089024)'
      }});
    }
  if (message.content.startsWith('e$vote')) {
      message.channel.send({embed: {
        title: 'Vote Link',
        color: 0xf1c40f,
        description: 'Loving EmojiRestrictBot? Vote me up on DiscordBots!\nWhen you vote, it generates more publicity for me, and helps others to find me.\nYour votes are appreciated!\n\nClick [here](https://discordbots.org/bot/545069699570860032/vote) to vote!'
      }});
    }
    if (message.content.startsWith('e$add') && message.member.hasPermission('MANAGE_EMOJIS')) {
        var n = args[0].split(':')[1];
        var emoji = message.guild.emojis.find(role => role.name == n);
        if (!emoji || !emoji.client || !emoji.guild || !emoji.deletable) {
          message.channel.send(`<:error:487316007040581632> ${message.member}, Invalid emoji.`);
          return;
        }
        var role = message.guild.roles.get(args[1]);
        if (!role) {role = message.mentions.roles.first();}
        if (!role) {
          message.channel.send(`<:error:487316007040581632> ${message.member}, Invalid role.`);
          return;
        }
        emoji.addRestrictedRole(role);
        message.channel.send('Adding restricted role...').then(msg => {
          setTimeout(function() {
            msg.edit('<:success:487316006843449354> Restricted role added.');
          }, 1000);
        });
    }
    if (message.content.startsWith('e$remove') && message.member.hasPermission('MANAGE_EMOJIS')) {
        var n = args[0].split(':')[1];
        var emoji = message.guild.emojis.find(role => role.name == n);
        if (!emoji || !emoji.client || !emoji.guild || !emoji.deletable) {
          message.channel.send(`<:error:487316007040581632> ${message.member}, Invalid emoji.`);
          return;
        }
        var role = message.guild.roles.get(args[1]);
        if (!role) {role = message.mentions.roles.first();}
        else if (!role) {
          message.channel.send(`<:error:487316007040581632> ${message.member}, Invalid role.`);
          return;
        }
        emoji.removeRestrictedRole(role);
        message.channel.send('Removing restricted role...').then(msg => {
          setTimeout(function() {
            msg.edit('<:success:487316006843449354> Restricted role removed.');
          }, 1000);
        });
    }
});
client.login(process.env.token);
