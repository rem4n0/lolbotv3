const Discord = require('discord.js');

module.exports = class  {
async run( newRole,oldRole){
  const { guild } =newRole
  
  if(!guild.me?.permissions.has(["MANAGE_GUILD","MANAGE_CHANNELS"])) return;


  try {
  let data = await Guild.findOne({guildID: newRole.guild.id})
    const logChannel = newRole.guild.channels.cache.get(data.plugins.logs?.roleUpdate?.channel);
    if (!logChannel) return;
  if(!data.plugins.logs?.roleUpdate?.enabled)
  return;
                    
    const allLogs = await newRole.guild.fetchAuditLogs({ type: "ROLE_UPDATE" });
    const fetchModerator = await allLogs.entries.first();
    if (oldRole.color !== newRole.color) {
        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: newRole.guild.name, iconURL: newRole.guild.iconURL({ dynamic: true }) })
        .setDescription(`😛 **\`${newRole.name}\` has been updated.**`)
     .setColor(data.plugins.logs.roleUpdate.color)
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
      .setColor(data.plugins.logs.roleUpdate.color)
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
    }/*
  if(oldRole.permissions !== newRole.permissions){
    
    
    
    const oldPerms = oldRole.serialize();
    console.log(oldPerms);
        const newPerms = newRole.serialize();

        const permUpdated = [];

        for (const [key, element] of Object.entries(oldPerms)) {
            if (newPerms[key] !== element) permUpdated.push(key);
        }

        
            //Permission lost
          
    const embed = new Discord.MessageEmbed()
    . setAuthor ({name: newRole.guild.name, iconURL: newRole.guild.iconURL({ dynamic: true})})
    . setDescription (`**\`${newRole.name}\` has been updated.**`)
    .setFooter({text: guild.name, iconURL:guild.iconURL()})
                
                .setTimestamp()
                .addFields({
                  name:"Old Role:",
                  value:`${permUpdated.join(", ")}`
                  
                },
                           {
                  name: `new Role:`,
                  value:`${newRole.permissions}`
                })
                return logChannel.send({embeds:[embed]})
            
    
    */
    
  } catch (err) {
      return;
  }
}}
