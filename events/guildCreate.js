const Discord = require("discord.js");
const config = require(`${process.cwd()}/config.json`)
module.exports = class {

	
	async run (guild,bot, message) {
    const channel = await bot.channels.cache.get(config.joinchannel);
    const owner = await guild.members.cache.get(guild.ownerId)
    
 ////   const invite = await guild.invites.create(guild.channels.cache.firstKey())
    const embed = new Discord.MessageEmbed()
    .setAuthor({name: guild.name})
    .setDescription("**Join Guild**")
   .addFields({ name: "GUILD MEMBER COUNT", value: `${guild.memberCount}`},
               
               {name: "GUILD OWENR NAME", value:`${owner?.user?.tag}`},
              )
     setTimeout(async()=>{
    await channel.send({embeds:[embed]})
  
     },2000)
	}}
