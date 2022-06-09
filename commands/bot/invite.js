const Discord = require("discord.js")


module.exports = {
  name: "invite",
  aliases: ["invites","inv","invite"],
  description:"invite link of bot",
  enabled: true,
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: false,
  cooldown: 3000,
  run: async (bot, message, args, dev) => {
    const row = new Discord.MessageActionRow()
			.addComponents(
        new Discord.MessageButton()
					
					.setLabel('invite')
          .setURL('https://bobowolrd.tk/support')
					.setStyle('LINK'),
			);
        
				// ...
			

		const embed2 = new Discord.MessageEmbed()
			.setColor('#0099ff')
		
			.setURL('https://boboworld.tk/invite')
			.setDescription('Invite bot by clicking the button');

  
    
    /*
    let embed = new Discord.MessageEmbed()
      .setColor(config.embed.Color)
      .setTitle("**Bobo Bot**  InviteLink!")
      .setURL(
        `https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot%20applications.commands`
)
    */ 
      
      message.channel.send({embeds:[embed2], components: [row]}).catch(err=>{
      message.author.send({embeds:[embed2],components: [row]})
      })
  }
}
