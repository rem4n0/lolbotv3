const Discord = require("discord.js")

module.exports = {
name:"help",
  description:'show you all commands',
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {
    let embed = new Discord.MessageEmbed()
      .setColor(config.embed.Color)
      .setDescription(`You can find all commands in our web dashboard: https://boboworld.xyz/commands `)
 interaction.reply({embeds:[embed]});
  

  }}

    
    
