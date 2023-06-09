
const Discord = require("discord.js")
const moment = require("moment")
moment.suppressDeprecationWarnings = true;
const news =require(`../../data/news.js`);
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
name:"news",
description:"all news about me",
  enabled: false,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {




      
let embed = new Discord.MessageEmbed()
      .setColor(config.embed.Color)
      .setTitle(`Bobo News`)
    .setDescription(`***__Date Published__ ${moment(data.news.time).format("dddd, MMMM Do YYYY")}*** \n**__[\`${moment(data.news.time).fromNow()}\`]__**\n\n ${data.news.news}`)
  
      .setFooter('Bobot Teams')
      .setTimestamp();
    interaction.reply({embeds:[embed]});
    
    
    
    
  }}
