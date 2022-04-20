const Discord = require("discord.js");
module.exports = class{
  async run( ban){
    if(!ban.guild.me.permissions.has(["MANAGE_GUILD","MANAGE_CHANNELS","VIEW_AUDIT_LOG"])) return;
    const allLogs = await ban.guild.fetchAuditLogs({ type: "MEMBER_BAN_REMOVE" });
    const fetchModerator = allLogs.entries.first();
    const embed = new Discord.MessageEmbed()
    .setAuthor({  name: ban.guild.name, iconURL: ban.guild.iconURL({ dynamic: true }) })
    .setDescription(`**🔨 <@${ban.user.id}> unbanned**`)
    .setThumbnail(ban.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setFooter({ text: ban.guild.name, iconURL: ban.guild.iconURL({ dynamic: true }) })
    .addFields(
      { name:"unban member", value:allLogs.target.tag},
       
        {
            name: "Responsible Moderator:",
            value: `<@${fetchModerator.executor.id}>`,
            inline: true
        },
        {
            name: "Unban Reason:",
            value: fetchModerator.reason || 'No reason',
            inline: true
        }
    )
  
}
    
  }