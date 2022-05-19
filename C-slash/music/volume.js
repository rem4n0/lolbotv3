

const Discord = require ("discord.js")
const player = require("../../handler/player");
module.exports = {

name:"volume",
  description:"change default volume",
  options:[{
  Integer:{
      name:"volume",
      description:"put volume number 0-100",
      required:true,
      
      
    }
    
    
    
  }],
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["music"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {
    const volume = await interaction.options.getInteger("volume") 
    const queue = player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return interaction.reply({content:
        `No music currently playing ... try again ? ❌`}
      );
if(!interaction.member.voice.channel){ return interaction.reply({content:`You can't change volume because you are not in my voice channel`})}
    const vol = volume;

    if (!vol)
      return interaction.reply({content:
        `The current volume is ${queue.volume} 🔊\n*To change the volume enter a valid number between **1** and **${maxVol}**.*`}
      );

    if (queue.volume === vol)
      return interaction.reply(
        `The volume you want to change is already the current one ... try again ? ❌`
      );
const maxVol = 100;
    if (vol < 0 || vol > maxVol)
      return interaction.reply(
        `The specified number is not valid. Enter a number between **1** and **${maxVol}** ... try again ? ❌`
      );

    const success = queue.setVolume(vol);

    return interaction.reply(
      success
        ? `The volume has been modified to **${vol}**/**${maxVol}**% 🔊`
        : `Something went wrong ... try again ? ❌`
    );
  }, 
};
