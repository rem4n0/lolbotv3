
const player = require ("../../handler/player");
module.exports = {

name:"resume",
  description:"play paused song befor",

  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["music"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {
if(!interaction.member.voice.channel){ return interaction.reply({content:`You cant resume `})}

const queue = player.getQueue(interaction.guild.id);

        if (!queue) return interaction.reply(`No music currently playing ${... try again ? ❌`);

        const success = queue.setPaused(false);

        return interaction.reply({content:`Current music ${queue.current.title} resumed`});}}