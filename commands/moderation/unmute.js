const Discord = require("discord.js");

module.exports = {
  name: "unmute",
  aliases: ["unmute"],
  description: "umute user when was he muted",
  usage: ["unmute <user>"],
  category: ["moderation"],
  enabled: true,
  memberPermissions: ["SEND_MESSAGES","MUTE_MEMBERS"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS","MUTE_MEMBERS"],
  ownerOnly: false,
  cooldown: 6000,
  run: async (bot, message, args, dev, data) => {
let user =
    message.mentions.users.first() || message.guild.members.cache.get(args[1]);
    if(!user) return message.channel.send({content:`i cant found this user`})
    let mute = message.guild.roles.cache.find(role => role.name === "Muted","mute");
    
       /* message.guild.channels.cache.forEach(async channel => {
      await channel.permissionOverwrites.create(mute, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
      });
    });**/
    message.guild.members.cache.get(user.id).roles.remove(mute);
    message.channel.send({content:`**${user.username} has been unmuted!**`});
  
  
  
  
  }
}