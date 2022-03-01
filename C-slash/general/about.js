const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  
name:"about",
  description:"aboutbot",
  
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
        .setTitle(`${bot.user.username} Information`)
        .setDescription(`This bot has been created by **<@768944616724103170>**`)
        .setColor(config.embed.Color)
        .setThumbnail(bot.user.displayAvatarURL())
    .addField(`**users**:`,`${bot.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0) }`)
        .addField(`**Bot Name:**`, `${bot.user.tag}`)
        .addField(`**Bot ID**`, `${bot.user.id}`)
        .addField(`**Bot Prefix**`, `${data.guild.prefix}`)
        .addField(`**Discord.js Version**`, `${Discord.version}`)
        .addField(`**Ping**`, `${Math.round(bot.ws.ping)}ms`)
        .addField(`**Guilds**`, `${bot.guilds.cache.size}`)
interaction.reply({embeds:[embed]})
    

  }}
