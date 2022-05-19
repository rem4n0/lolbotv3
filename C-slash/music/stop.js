
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
  run: async (interaction,bot,data) => {
if(!interaction.member.voice.channel){ return interaction.reply({content:`You can't stop songs`})}
    
    const queue = player.getQueue(interaction.guildId);
    queue.stop()
    interaction.reply({content:`Stopped 🚫`});
    
  }}