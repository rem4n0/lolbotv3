const player = require ("../../handler/player.js")

module.exports = {

name:"pause",
  description:"pause current song",
  
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["music"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {
if(!interaction.member.voice.channel){ return interaction.reply({content:`You cant pause songs `})}
        const queue = player.getQueue(interaction.guild.id);

        if (!queue) return interaction.reply({content:`No music currently playing ... try again ? ❌`});

        const success = queue.setPaused(true);
        return interaction.reply({content: `Current music ${queue.current.title} paused ✅`});
  }}