const Discord = require("discord.js");
module.exports = class {
  async run(ban) {
    let data = await Guild.findOne({ guildID: ban.guild.id });
    const entry1 = await ban.guild
      .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
      .then((audit) => audit.entries.first());
    const user2 = entry1.executor;
   // const member = entry1.entries.first();
    try {
      const channelEmbed = await ban.guild.channels.cache.get(
        data.plugins.logs.channel
      );

      if (!channelEmbed) return console.log("hh");
      const embed = new Discord.MessageEmbed()
        .setDescription(`:pencil: **Ban Action**`)
        .addField("Moderator Name", user2.tag, true)
        .addField("User banned", ban.guild.user.username, true)
        .addFielf("reason", entry1.reason || "not have reason", true)
        .setFooter({ text: ban.guild.name })
        .setThumbnail(ban.guild.iconURL())
        .setTimestamp()
        .setColor(config.embed.Color);

      if (
        channelEmbed &&
        channelEmbed.viewable &&
        channelEmbed
          .permissionsFor(guild.me)
          .has(["SEND_MESSAGES", "EMBED_LINKS"])
      ) {
      channelEmbed.send({ embeds: [embed] }).catch((err) => {
          console.log(err);
        });

        setTimeout(() => {}, 3000);
      }
    } catch (err) {
      return;
    }
  }
};
