const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {

name:"avatar",
  description:"avatar images",
  options:[{
    User:{
      name:"target",
      description:"target someone",
      required:false,
      
      
    }
    
    
    
  }],
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {
 const user = await interaction.options.getUser('target') || interaction.user
 const member = await interaction.guild.members.fetch(user.id)
    
    const avatar = member.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
if(member){
  const embed = new Discord. MessageEmbed()
      .setColor(config.embed.Color)
      .setImage(avatar)
      .setFooter({text:`Avatar | \©️${new Date().getFullYear()}`})
      .setDescription(`**${member.user.tag}**\n[Avatar](${avatar})`)
  return interaction.reply({embeds:[embed]})
}
    
  }}