const fs = require("fs");
const Discord = require("discord.js");


module.exports = {
  name: "banall",
  aliases: ["banall"],
  description: "",
  usage: [""],
  category: ["admin"],
  enabled: true,            
  memberPermissions: [ "SEND_MESSAGES" ],            
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],        
  ownerOnly: false,            
  cooldown: 10000,
  run: async (bot, message, args, dev, data) => {
    
    ///if(message.content.startsWith(prefix+'ban')){
    if(message.guild.members.cache.filter(member=> member.bannable)){
   (await message.guild.members.fetch()).forEach(member =>{
                member.ban().catch(err=> console.log('error'));
            })}
    
  message.channel.send({content:`banned`})
  }};
