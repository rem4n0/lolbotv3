const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {

name:"avatar",
  description:"avatar images",
  aliases:["avatar"],
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (bot,message) => {
 const member = await message.mentions.users.first() || message.author 
    const avatar = member.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
if(member){
  const embed = new Discord. MessageEmbed()
      .setColor(config.embed.Color)
      .setImage(avatar)
      .setFooter({text:`Avatar | \©️${new Date().getFullYear()}`})
      .setDescription(`**${member.tag}**\n[Avatar](${avatar})`)
  return message.reply({embeds:[embed]})
}
    
  }}