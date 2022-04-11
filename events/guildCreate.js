const Discord = require("discord.js");
const config = require(`${process.cwd()}/config.json`)
module.exports = class {

	
	async run (guild,bot, message) {
    const owner = await guild.fetch(guild.ownerId)
    const invite = await guild.invites.create(guild.channels.cache.firstKey())
    const embed = new Discord.MessageEmbed()
    .setAuthor({name: guild.name})
    .setDescription("**Join Guild**")
    .addFields({ name: "GUILD MEMBER COUNT", value:guild.memberCount},
               
               {name: "GUILD OWENR NAME", value:owner.tag},
               { name:"GUILD INVITE LINL", value: `[invitelink](${invite})`})
     setTimeout(()=>{
    
  webhook.send({
    embeds:[embed]
    
    
    
    
    
  })
     },2000)
	}}
