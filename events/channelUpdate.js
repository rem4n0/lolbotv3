const cooldown = new Set();



let Discord = require("discord.js");
module.exports = class{
  async run(oldChannel,newChannel){
    const {guild} = oldChannel
  
let data = await Guild.findOne({guildID: guild.id})
const channelEmbed = await guild.channels.cache.get(data.plugins.logs.channel)

    const maintenance = await Maintenance.findOne({
  server: config.serverid
})

if(maintenance && maintenance.toggle == "true") return;
    
    let type;

  if(newChannel.type === "GUILD_CATEGORY") type = "Category";
  if(newChannel.type === "GUILD_TEXT") type = "Text Channel";
  if(newChannel.type === "GUILD_VOICE") type = "Voice Channel";
  
      let embed = new Discord.MessageEmbed()
      .setColor(config.embed.Color)
      .setAuthor({name: guild.name, urlIcon: guild.iconURL()})
      .addField('Channel',`${ newChannel}`, true)
    .setFooter(`Channel ID: ${newChannel.id}`)
    .setTimestamp()
    if(oldChannel.name !== newChannel.name) {
    embed.addFields({name:'Name Update', value:`${oldChannel.name} --> ${newChannel.name}`})

 } else {
    embed.addFields({name:'Name Update',value: `Name not updated`})

 }
    if(oldChannel.topic || newChannel.topic){
if(oldChannel.topic !== newChannel.topic){

embed.addFields({name:'Topic', value:`${oldChannel.topic || 'none'} --> ${newChannel.topic || 'none'}`})

}
}

   if(oldChannel.nsfw || newChannel.nsfw){
if(oldChannel.nsfw !== newChannel.nsfw){


embed.addFields({name:'NSFW',value: `${oldChannel.nsfw} --> ${newChannel.nsfw}`})

}
     
} 
  if(oldChannel.permissions){
   oldChannel
      .permissionOverwrites.edit(oldChannel.guild.id, {
        SEND_MESSAGES: false
      })
      embed.addFields({name:"nn", value:"jj"}) 
    
  }
    
    
    
    
    if(oldChannel.rateLimitPerUser || newChannel.rateLimitPerUser ){
if(oldChannel.rateLimitPerUser!== newChannel.rateLimitPerUser){

embed.addFields({name:'Slowmode',value: `${oldChannel.rateLimitPerUser} --> ${newChannel.rateLimitPerUser}`})

}
}
  
    if(oldChannel.rateLimitPerUser === newChannel.rateLimitPerUser ){
  if(oldChannel.name === newChannel.name) {
    if(oldChannel.topic === newChannel.topic){
      if(oldChannel.nsfw === newChannel.nsfw){
        return; 
      }
    }
  }
}if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(newChannel.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
            channelEmbed.send({embeds:[embed]}).catch(()=>{})
                   cooldown.add(newChannel.guild.id);
            setTimeout(()=>{
cooldown.delete(newChannel.guild.id)
            }, 2000)
      }

    
    
    
  }}
    
    
    