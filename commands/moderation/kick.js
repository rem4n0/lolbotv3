const Discord = require('discord.js');
module.exports = {
    name: "kick",
    aliases: ["kick"],
    description: "kick",
    usage: ["kick"],
    category: ["moderation"],
    enabled: true,
    memberPermissions: ["KICK_MEMBERS"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "KICK_MEMBERS"],
    ownerOnly: false,
    cooldown: 6000,
    run: async (bot, message, args, dev) => {
      
  let data = await Guild.findOneAndUpdate({guildID: message.guild.id})
  
     let user = await message.mentions.members.first() || await message.guild.members.fetch(args[1])
     
      let reason = args.slice(2).join(" ");
      const member = await message.guild.members.fetch(user.id).catch(() => {});
if(member){
    
  
    const memberPosition = member.roles.highest.position;
			const moderationPosition = message.member.roles.highest.position;
			if(message.member.ownerId !== message.author.id && !(moderationPosition > memberPosition)){
				return message.channel.send({content:`You can't sanction or update a sanction for a member who has an higher or equal role hierarchy to yours!
    `})
			}
			if(!member.kickable) {
				return message.channel.send({content:`An error has occurred... Please check that I have the permission to ban this specific member and try again!`})
			}
	
      await user.send(`**${message.author.tag}**kicked you from ${message.guild.name}!\n**Reason**: ${reason|| 'Unspecified.'}`)
    .catch(() => null);

    return user.kick({ reason:`${reason || ' unspecified'}`})
    .then(_member => message.channel.send(`Successfully Kicked **${_member.user.tag}**`))
    .catch((err) => message.channel.send(`Failed to ban **${user.user.tag} : reason: Your role not high than this member or ${err.name}**!`));



  


    
    
    }
}}
