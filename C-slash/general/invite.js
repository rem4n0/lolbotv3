const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  name:"invite",
  description:"give you my invite link",
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {
const row = new Discord.MessageActionRow()
			.addComponents(
				new MessageButton()
					//.setCustomId('primary')
					.setLabel('Link')
.setURL('https://bobowolrd.tk/invite')
					.setStyle('LINK'),
			);

let embed = new Discord.MessageEmbed()
      .setColor(config.embed.Color)
      .setDescription(`Invite bot by clicking the button`)
      

      
      interaction.reply({embeds:[embed], components:[row]})
      }}
