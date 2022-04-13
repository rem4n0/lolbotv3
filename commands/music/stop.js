const Discord = require('discord.js')
const player=  require(`${process.cwd()}/handler/player`)
module.exports = {
  name: "stop",
  aliases: ["stop"],
  usage: ["stop"],
  description: "stop currently song",
  category: "admin",
  enabled:true,
  ownerOnly: false,
  cooldown: 6000,
  botPermissions: ["SEND_MESSAGES","EMBED_LINKS"],
  memberPermissions: ["CONNECT","SEND_MESSAGES"],
  run: async (bot, message, args) => {
    
    
    const queue = player.getQueue(message.guildId);
    queue.stop()
    message.reply({content:`Stopped 🚫`});
    
  
    
    
  }}