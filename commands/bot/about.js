const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
function intToString (value) {
    var suffixes = ["", "K", "M", "B","T"];
    var suffixNum = Math.floor((""+value).length/3);
    var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
    if (shortValue % 1 != 0) {
        shortValue = shortValue.toFixed(1);
    }
    return shortValue+suffixes[suffixNum];
}
module.exports = {
  
name:"about",
  description:"some information about bot",
  aliases:["about","botinfo"],
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (bot,message) => {
    let data = await Guild.findOne({guildID: message.guild.id})
    if(!data) return;
    let embed = new Discord.MessageEmbed()
        .setTitle(`${bot.user.username} Information`)
        .setDescription(`**This bot has been created by**`)
        .setColor(config.embed.Color)
        .setThumbnail(bot.user.displayAvatarURL({format:"png"}))
    .addField(`**users**:`,intToString(`${bot.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0) }`))
        .addField(`**Bot Name:**`, `${bot.user.tag}`)
        .addField(`**Bot ID**`, `${bot.user.id}`)
        .addField(`**Bot Prefix**`, `${data.prefix}`)
        .addField(`**Discord.js Version**`, `${Discord.version}`)
        .addField(`**Ping**`, `${Math.round(bot.ws.ping)}ms`)
        .addField(`**Guilds**`, `${bot.guilds.cache.size}`)
await message.channel.send({embeds:[embed]})
    

  }}
