const Discord = require('discord.js'),
  settings = require('../settings.json');
  const Settings = require('../models/settings.js');
  const mongoose = require('mongoose');
  
module.exports = guild => {
  let owner = guild.ownerID,
    channel = guild.channels.cache.get(guild.systemChannelID || channelID),
    joinEmbed = new Discord.MessageEmbed()
  .setTitle("Axios")
  .setDescription(`Hello ${guild.name}, thanks for inviting me to this server! My default prefix is a!, however, you can use the command ${settings.prefix}prefix to set a new prefix!`)
  .setFooter()
  channel.send(joinEmbed)
      let newData = new Settings({
      _id: mongoose.Types.ObjectId(),
      guildID: guild.id,
      prefix: "a!",
    })
    newData.save();
    let blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));
    channel = guild.channels.cache.get(guild.systemChannelID || channelID)
    client.guilds.forEach((guild) => {
      if (!blacklist[guild.ownerID]) return
      if(blacklist[guild.ownerID].state === true) {
        channel.send("But UNFORTUNATELY, the owner of this server has been blacklisted before so I'm LEAVING! Bye!")
        guild.leave(guild.id)
      }
    })
}
