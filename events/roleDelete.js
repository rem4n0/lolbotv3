/*const Event = require('../../structures/Event');
const logger = require('../../utils/logger');
const Logging = require('../../database/schemas/logging');*/
const discord = require("discord.js");
const moment = require("moment");
const cooldown = new Set();

module.exports = class {
  async run(role, message) {
    if (!role) return;
    const { guild} = role
if (!guild.me.permissions.has(["MANAGE_GUILD", "MANAGE_CHANNELS"])) return;

try {
    const entry1 = await guild
      .fetchAuditLogs({ type: "ROLE_DELETE" })
      .then((audit) => audit.entries.first());
    const user2 = entry1.executor;

    const guild = await Guild.findOne({ guildID: role.guild.id });

  if(!guild.plugins.logs.roleDelete){
    
    await Guild.updateOne({guildID: guild.id},
{ $set:{ "plugins.logs.roleDelete.enabled":false ,
"plugins.logs.roleDelete.channel":null ,
"plugins.logs.roleDelete.color":null ,}})
  }
    
  
  
  
  
    const maintenance = await Maintenance.findOne({
      maintenance: "maintenance",
    });

    if (maintenance && maintenance.toggle == "true") return;

    if (cooldown.has(role.guild.id)) return;

   /// if (!guild.plugins.logs.roleDelete.enabled) return;

    if (guild) {
      if (guild.plugins.logs.roleDelete.enabled) {
        const channelEmbed = await role.guild.channels.cache.get(
          guild.plugins.logs.roleDelete.channel
        );

        if (channelEmbed) {
          let color = config.embed.Color;

          const embed = new discord.MessageEmbed()
            .setThumbnail(role.guild.iconURL())
            .setDescription(`:pencil: **Role Delete**`)
            .addFields(
              { name: "Role Name", value: role.name },
              { name: " Responsible Moderator", value: user2.tag }
            )
            .setTimestamp()
            .setFooter({ text: role.guild.name })
            .setColor(guild.plugins.logs.roleDelete.color);

          if (
            channelEmbed &&
            channelEmbed.viewable &&
            channelEmbed
              .permissionsFor(role.guild.me)
              .has(["SEND_MESSAGES", "EMBED_LINKS"])
          ) {
            channelEmbed.send({ embeds: [embed] }).catch((err) => {
              console.log(err.name);
            });
            cooldown.add(role.guild.id);
            setTimeout(() => {
              cooldown.delete(role.guild.id);
            }, 3000);
          }
        }
      }
    }} catch (err) {
      return;
    }
  }
};
