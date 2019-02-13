//https://discordapp.com/oauth2/authorize?client_id=545069699570860032&scope=bot&permissions=1074089024
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
    if (message.content.startsWith('e$add') && message.member.hasPermission('MANAGE_EMOJIS')) {
        var n = args[0].split(':')[1];
        var emoji = message.guild.emojis.find('name', n);
        if (!emoji || !emoji.client || !emoji.guild || !emoji.deletable) {
          message.channel.send(`<:error:487316007040581632> ${message.member}, Invalid emoji.`);
          return;
        }
        var role = message.guild.roles.get(args[2]);
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
        var emoji = message.guild.emojis.find('name', n);
        if (!emoji || !emoji.client || !emoji.guild || !emoji.deletable) {
          message.channel.send(`<:error:487316007040581632> ${message.member}, Invalid emoji.`);
          return;
        }
        var role = message.guild.roles.get(args[2]);
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
    if (message.content.startsWith('e$eval')&&message.author.id === "270997352939126794") {
        try {
          const code = args.join(" ");
          let evaled = eval(code);
    
          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
    
          message.channel.send(clean(evaled), {code:"xl"});
        } catch (err) {
          message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
});//Message
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
client.login(process.env.token);
