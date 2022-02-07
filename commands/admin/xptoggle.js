const fs = require("fs");
const Discord = require('discord.js')


module.exports = {
  name: "xptoggle",
  aliases: ["xp"],
  description: "enabled and disabled xp system",
  usage: ["Boxp [on/off]"],
  category: ["admin"],
  enabled: true,
  memberPermissions: ["SEND_MESSAGES","ADMINISTRATOR"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: false,
  guilOwnerOnly: true,
  cooldown: 3000,
  run: async (bot, message, args) => {

   let guild = await Guild.findOneAndUpdate({guildID: message.guild.id});
     let status = args[1];
    if (status === "on") {
      guild.xp.onoff = "on"
      guild.markModified("xp.onoff")
      guild.save();
      return message.channel.send({content:`xp status has been update to **on**`})
    
     } else if (status === "off") {
        guild.xp.onoff = null;
         guild.markModified('xp.onoff')
        guild.save();
      return message.channel.send({content:` Xp system from guild is disabled`})
    }
  
      return message.channel.send({content:`error syntax ${guild.prefix} [on,off] `})
        
  }
};
