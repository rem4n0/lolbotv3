const Discord = require("discord.js");
module.exports = class {
  async run(ban, bot) {
    let data = await Guild.findOne({ guildID: ban.guild.id });
    //let data = await Guild.findOne({ guildID: ban.guild.id }) || new Guild({guildID: ban.guild.id});
if (!ban.guild.me.permissions.has(["MANAGE_GUILD", "MANAGE_CHANNELS"])) return;

    try {
         const maintenance = await Maintenance.findOne({
      maintenance: "maintenance",
    });

    if (maintenance && maintenance.toggle == "true") return;
 
      
      
      if (!data) return;
      const entry1 = await ban.guild
        .fetchAuditLogs({
          type: "MEMBER_BAN_ADD",
        })
        .then((audit) => audit.entries.first());
      const user2 = entry1.executor;
      if (!data.plugins.banAdd) {
        await Guild.updateOne(
          { guildID: ban.guild.id },
          {
            $set: {
              "plugins.logs.banAdd.enabled": false,
              "plugins.logs.banAdd.channel": null,
              "plugins.logs.banAdd.color": null,
            },
          }
        );
      }
      if(data.plugins.logs){
      if(data.plugins.logs.banAdd.enabled){
      const channelEmbed = await ban.guild.channels.cache.get(
        data.plugins.logs.banAdd.channel
      );

      if (!channelEmbed) return;
      const embed = new Discord.MessageEmbed()
        .setDescription(`:pencil: **Ban Action**`)
        .addField("Moderator Name", user2.tag, true)
        .addField("User Banned", entry1.target.tag, true)
        .addField("reason", entry1.reason || "not have reason", true)
        .setFooter({ text: ban.guild.name })
        .setThumbnail(ban.guild.iconURL())
        .setTimestamp()
        .setColor(data.plugins.logs.banAdd.color);

      if (
        channelEmbed &&
        channelEmbed.viewable &&
        channelEmbed
          .permissionsFor(ban.guild.me)
          .has(["SEND_MESSAGES", "EMBED_LINKS"])
      ) {
        channelEmbed.send({ embeds: [embed] }).catch((err) => {
          console.log(err);
        });

        setTimeout(() => {}, 3000);
      }}}
    } catch (err) {
      return;
    }
  }
};
