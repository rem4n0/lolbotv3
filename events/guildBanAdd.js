const Discord = require("discord.js")
module.exports = class {
  async run(guild,member) {
    
    const entry1 = await guild.fetchAuditLogs({ type: "GUILD_BAN_ADD" })
        .then(audit => audit.entries.first());
      const user2 = entry1.executor;
    try {
const user = await guild.members.fetch(member.id).catch(() => {});
      const channelEmbed = await guild.channels.cache.get(data.plugins.logs.channel)

      if(!channelEmbed) return;
    const embed = new Discord.MessageEmbed()
    .setDescription(`:pencil: **Ban Action**`)
    .addField('Moderator Name', message.author.toString(), true)
    .addField('User banned',user.user.username, true)
    .addFielf('reason', reason||"not have reason",true)
    .setFooter({text:guild.name})
    .setThumbnail(guild.iconURL())
    .setTimestamp()
    .setColor(config.embed.Color)
  
   
   
        if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
            channelEmbed.send({embeds:[embed]}).catch((err)=>{console.log(err)})
          
            setTimeout(()=>{
            }, 3000)
      }
    } catch (err) {
      return;
    }}}
       