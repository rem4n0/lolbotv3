const Discord = require("discord.js");
module.exports = class {
  async run(ban,bot) {
    let data = await Guild.findOne({ guildID: ban.guild.id });
    const entry1 = await ban.guild
      .fetchAuditLogs({ 
        
        type: "GUILD_BAN_ADD"
      })
      .then((audit) => audit.entries.first());
    const user2 = entry1.executor;
   // const member = entry1.entries.first();
  
      const channelEmbed = await ban.guild.channels.cache.get(
        data.plugins.logs.channel
      );

    console.log(entry1.reason)
    console.log(entry1.target);
      const embed = new Discord.MessageEmbed()
        .setDescription(`:pencil: **Ban Action**`)
        .addField("Moderator Name", user2.tag, true)
        .addField("User banned", true)
        .addFielf("reason", entry1.reason || "not have reason", true)
        .setFooter({ text: ban.guild.name })
        .setThumbnail(ban.guild.iconURL())
        .setTimestamp()
        .setColor(config.embed.Color);

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

        setTimeout(() => {}, 100);
      }
    
  }
};
