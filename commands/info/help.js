const Discord = require("discord.js"),
  superagent = require("superagent"),
  fs = require("fs"),
  modules = [
  "apis",
  "economy",
  "images",
  "info",
  "misc",
  "moderation",
  "music",
  "owner",
  "roleplay",
  "utility"
];


function permlevel(input) {
  if (input == 5)
    return "Can only be used by owner of bot";
  else if (input == 4)
    return "Can only be used by guild owner";
  else if (input == 3)
    return "Manage Guild";
  else if (input == 2)
    return "Ban Members";
  else if (input == 1)
    return "Manage Messages";
  else return "Anyone can use this command!";
}
exports.run = async (client, message, args, tools) => {

require('discord-buttons')(client);
const { MessageButton, MessageActionRow } = require('discord-buttons');

let button = new MessageButton()
  .setStyle('url')
  .setURL('https://top.gg/bot/809175820340822056/vote') 
  .setLabel('Vote!'); 

  if (!args[0]) {
    let categoryEmbed = new Discord.MessageEmbed()
      .setTitle("Categories of commands for Axios")
      .setColor("#0174c3")

      .setDescription(
        "\`apis\`\n\`economy\`\n\`images\`\n\`info\`\n\`moderation\`\n\`music\`\n\`owner\`\n\`roleplay\`\n\`utility\`\n\nUse `a!help <category>` to see the commands for that category!"
      )
      .setFooter("Axios")
      .setTimestamp();
    message.channel.send(categoryEmbed);
  } else {
    if (modules.includes(args[0])) {
      fs.readdir(`commands/${args[0]}`, (err, files) => {
        let filesArray = [];
        if (err) console.error(err);
        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if (jsfiles.length <= 0) {
          message.channel.send(
            "There are no commands in the directory " + args[0]
          );
          return;
        }

        jsfiles.forEach(f => {
          let props = require(`../../commands/${args[0]}/${f}`);
          filesArray.push(`\`${props.help.name}\``);
        });

        let commandslist = filesArray.join("\n"),
          listEmbed = new Discord.MessageEmbed()
          .setTitle(`Commands in directory \"${args[0]}\"`)
          .setColor("#0174c3")

          .setDescription(commandslist + "\n\nUse `a!help <command>` to see help for an individual command!")
          .setFooter("Axios")
          .setTimestamp();

        message.channel.send(listEmbed);
      });
    } else {
      let command = args[0];
      if (client.commands.has(command)) {
        cmd = client.commands.get(command);
        let helpEmbed = new Discord.MessageEmbed()
          .setTitle(`Help for command ${cmd.help.name}`)
          .setColor("#0174c3")
          .setDescription(
            `Name: ${cmd.help.name}\nDescription: ${
              cmd.help.description
            }\nUsage: \`${cmd.help.usage}\`\nPermission Level: ${cmd.conf.permLevel} (${permlevel(
              cmd.conf.permLevel
            )})\n\nPro tip: You can vote for the bot using \`a!vote\` and you can get coins for it!`
          )
          .setFooter("Axios")
          .setTimestamp();
        message.channel.send(helpEmbed);
      } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
        cmd = client.commands.get(command);
        let helpEmbed = new Discord.MessageEmbed()
          .setTitle(`Help for command ${cmd.help.name}`)
          .setColor("#0174c3")

          .setDescription(
            `Name: ${cmd.help.name}\nDescription: ${
              cmd.help.description
            }\nUsage: \`${cmd.help.usage}\`\nPermission Level: ${cmd.conf.permLevel} (${permlevel(
              cmd.conf.permLevel
            )})\n\nPro tip: You can vote for the bot using \`a!vote\` and you can get coins for it!`
          )
          .setFooter("Axios")
          .setTimestamp();
        message.channel.send(helpEmbed);
      } else {
        return message.reply("That command doesn't exist!");
      }
    }
  }
  message.channel.send("Please vote!", {button: button})
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  cooldown: 5,
  permLevel: 0
};

exports.help = {
  name: "help",
  description:
    "Returns a list of categories of commands, a list of commands for a category, or help for a command itself.",
  usage: "help <command or category>",
  example: "help bot (returns list of commands for the bot category)"
};
