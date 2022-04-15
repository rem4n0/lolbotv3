
let Discord = require("discord.js");
module.exports = class{
  async run(oldChannel,newChannel){
    const {guild} = oldChannel

    
    
    
    if(oldChannel && newChannel === "GUILD_TEXT"){
      
      let embed = new Discord.MessageEmbed()
      .setColor(config.embed.Color)
      .setAuthor({name: guild.name, urlIcon: guild.iconURL()})
      .addFields({
        name:"Channel Update"
    
    
  }}
    
    
    