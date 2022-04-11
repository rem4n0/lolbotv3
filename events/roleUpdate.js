const Discord = require('discord.js');

module.exports = class  {
async run( newRole,oldRole){
  const { guild } =newRole
  console.log(oldRole.permissions)
  if(!guild.me.permissions.has("MANAGE_GUILD","MANAGE_CHANNEL")) return;


  try {
  let data = await Guild.findOne({guildID: newRole.guild.id})
    const logChannel = newRole.guild.channels.cache.get(data.plugins.logs.channel);
    if (!logChannel) return;
  if(!data.plugins.logs.enabled)
  return;
                    
    const allLogs = await newRole.guild.fetchAuditLogs({ type: "ROLE_UPDATE" });
    const fetchModerator = await allLogs.entries.first();
    if (oldRole.color !== newRole.color) {
        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: newRole.guild.name, iconURL: newRole.guild.iconURL({ dynamic: true }) })
        .setDescription(`😛 **\`${newRole.name}\` has been updated.**`)
        .setFooter({ text: fetchModerator.executor.tag, iconURL: fetchModerator.executor.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .addFields(
            {
                name: "Old Color:",
                value: `${oldRole.hexColor}`
            },
            {
                name: "New Color:",
                value: `${newRole.hexColor}`
            },
            {
                name: "Responsible Moderator:",
                value: `<@${fetchModerator.executor.id}>`
            }
        )
        return logChannel.send({ embeds: [embed] })
    }
    if (oldRole.name !== newRole.name) {
        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: newRole.guild.name, iconURL: newRole.guild.iconURL({ dynamic: true }) })
        .setDescription(`😛 **\`${newRole.name}\` has been updated.**`)
        .setFooter({ text: fetchModerator.executor.tag, iconURL: fetchModerator.executor.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .addFields(
            {
                name: "Old name:",
                value: `${oldRole.name}`
            },
            {
                name: "New name:",
                value: `${newRole.name}`
            },
            {
                name: "Responsible Moderator:",
                value: `<@${fetchModerator.executor.id}>`
            }
        )
        return logChannel.send({ embeds: [embed] })
    }
  if(oldRole.permissions !== newRole.permissions){
    
    const embed = new Discord.MessageEmbed()
    . setAuthor ({name: newRole.guild.name, iconURL: newRole.guild.iconURL({ dynamic: true})})
    . setDescription (`**\`${newRole.name}\` has been updated.**`)
    .setFooter({text: guild.name, iconURL:guild.iconURL()})
                
                .setTimestamp()
                .addFields({
                  name:"Old Role:",
                  value: String(`${oldRole.permissions}`)
                  
                },
                           {
                  name: `new Role:`,
                  value:`${newRole.permissions}`
                })
                return logChannel.send({embeds:[embed]})
            
    
    
    
  }} catch (err) {
      return;
  }
}}