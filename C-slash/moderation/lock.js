

const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  
  name:"lock",
  description:'lock is a moderation command to lock channels',
  options:[{
    Channel:{
      name:"mention_channel",
      description:"mention text channel",
      required:false,
    }}],
  
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES","MANAGE_CHANNELS" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS","MANAGE_CHANNELS"],		
  enabled:true,
  category:["moderation"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data,channelEmbed) => {

    

   // const data = await Guild.findOne({guildID: message.guild.id})
  let channel = await interaction.options.getChannel('mention_channel') || interaction.channel
  if(!channel) return interaction.reply({content:`Mention channel first `})
  channel
      .permissionOverwrites.edit(interaction.guild.id, {
        SEND_MESSAGES: false
      })
      .then(async() => {
        interaction.reply({content:`channel locked`}).catch(()=>{ return;})
    
    
  })
   }
}
