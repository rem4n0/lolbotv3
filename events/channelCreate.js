
const discord = require("discord.js");
const moment = require("moment");
const cooldown = new Set();

module.exports = class {
  async run(message) {
    const { guild } = message;
    if (!guild.me.permissions.has(["MANAGE_GUILD", "MANAGE_CHANNELS"])) return;
    try {
      const entry1 = await guild
        .fetchAuditLogs({ type: "CHANNEL_CREATE" })
        .then((audit) => audit.entries.first());
      const user2 = entry1.executor;

      const guildData = await Guild.findOne({ guildID: message.guild.id });

      if (!guildData.plugins.logs.channelCreate) {
        await Guild.updateOne(
          { guildID: guild.id },
          {
            $set: {
              "plugins.logs.channelCreate.enabled": false,
              "plugins.logs.channelCreate.channel": null,
              "plugins.logs.channelCreate.color": null,
            },
          }
        );
      }
      const maintenance = await Maintenance.findOne({
        maintenance: "maintenance",
      });

      if (maintenance && maintenance.toggle == "true") return;

      if (cooldown.has(message.guild.id)) return;
      if (!guildData.plugins.logs.channelCreate.enabled) return;

      /// if (message.name.indexOf("Room") >= 0) return;

      if (guildData.plugins.logs) {
        if (guildData.plugins.logs.channelCreate.enabled) {
          const channelEmbed = await message.guild.channels.cache.get(
            guildData.plugins.logs.channelCreate.channel
          );
          if (channelEmbed) {
            let color = config.embed.Color;

            if (message.type === "GUILD_TEXT") {
              const embed = new discord.MessageEmbed()
                .setThumbnail(guild.iconURL())
                .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
                .setDescription(`:pencil: ***Channel Created***`)
                .addFields(
                  {
                    name: "Channel Name",
                    value: message.name,
                  },
                  { name: "Category", value: message.parent.name },
                  { name: "Channel Type", value: message.type },
                  { name: " Responsible Moderator", value: user2.tag }
                )

                .setTimestamp()
                .setFooter({ text: guild.name })
                .setColor(guildData.plugins.logs.channelCreate.color);

              if (message.parent && message.type !== "category")
                if (
                  channelEmbed &&
                  channelEmbed.viewable &&
                  channelEmbed
                    .permissionsFor(message.guild.me)
                    .has(["SEND_MESSAGES", "EMBED_LINKS"])
                ) {
                  channelEmbed.send({ embeds: [embed] }).catch((err) => {
                    console.log(err.name);
                  });
                  cooldown.add(message.guild.id);
                  setTimeout(() => {
                    cooldown.delete(message.guild.id);
                  }, 3000);
                }
            }
            if (message.type === "GUILD_VOICE") {
              const embed = new discord.MessageEmbed()
                .setThumbnail(message.guild.iconURL())
                .setAuthor(message.guild.name)
                .setDescription(`:pencil: ***Channel Created***`)
                .addFields(
                  {
                    name: "Channel Name",
                    value: message.name,
                  },
                  { name: "Category", value: message.parent.name },
                  { name: "Channel Type", value: message.type },
                  { name: " Responsible", value: user2.tag }
                )

                .setTimestamp()
                .setFooter({ text: message.guild.name })
                .setColor(guildData.plugins.logs.channelCreate.color);

              if (
                channelEmbed &&
                channelEmbed.viewable &&
                channelEmbed
                  .permissionsFor(message.guild.me)
                  .has(["SEND_MESSAGES", "EMBED_LINKS"])
              ) {
                channelEmbed.send({ embeds: [embed] }).catch((err) => {
                  console.log(err.name);
                });
                cooldown.add(message.guild.id);
                setTimeout(() => {
                  cooldown.delete(message.guild.id);
                }, 3000);
              }
            }
          }
        }
      }
    } catch (err) {
      return;
    }
  }
};
