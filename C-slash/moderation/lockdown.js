    const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  
  name:"lockdown",
  description:"lockdown all channels",
  options:/*[{
    Integer:{
      name:"time",
      description:"give me time to unlocke all channels",
      required:false,
    }}],*/[],
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES","MANAGE_CHANNELS"],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS","MANAGE_CHANNELS" ],		
  enabled:true,
  category:["admin"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data,channelEmbed) => {
    

  

   await interaction.guild.channels.cache
      .filter((c) => c.type ==="GUILD_TEXT")
      .forEach(async (channel) => {
        channel.permissionOverwrites.edit(interaction.guild.id, {
          SEND_MESSAGES: false,
          VIEW_CHANNEL: true,
        });
      });
  interaction.reply({content:` I locked all channels`}).catch(err =>{
      interaction.editReply({content:`I cant locke all ${err.name}`})})
      
      
    
  }
};
