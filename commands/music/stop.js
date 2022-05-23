const player = require("../../handler/player.js");

module.exports = {

name:"stop",
  description:"stop song",

  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (message,bot,data) => {
if(!message.member.voice.channel){ return message.reply({content:`You can't stop songs`})}
    
    const queue = player.getQueue(message.guild.id);
    queue.stop()
    message.reply({content:`Stopped 🚫`});
    
  }}
