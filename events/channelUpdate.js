const cooldown = new Set();

let Discord = require("discord.js");
module.exports = class {
  async run(oldChannel, newChannel, oldPerm, newPerm) {
    const { guild } = oldChannel;
    try {
      const entry1 = await guild
        .fetchAuditLogs({ type: "CHANNEL_UPDATE" })
        .then((audit) => audit.entries.first());

      let data = await Guild.findOne({ guildID: guild.id });
      if (!data.plugins.logs.channelUpdate) {
        await Guild.updateOne(
          { guildID: guild.id },
          {
            $set: {
              "plugins.logs.channelUpdate.enabled": false,
              "plugins.logs.channelUpdate.channel": null,
              "plugins.logs.channelUpdate.color": null,
            },
          }
        );
      }
      if (data.plugins.logs.channelUpdate.enabled) {
        const channelEmbed = await guild.channels.cache.get(
          data.plugins.logs.channelUpdate.channel
        );
    const maintenance = await Maintenance.findOne({
      maintenance: "maintenance",
    });

    if (maintenance && maintenance.toggle == "true") return;

        
        let type;

        if (data.plugins.logs) {
          if (data.plugins.logs.channelUpdate.enabled) {
            if (newChannel.type === "GUILD_CATEGORY") type = "Category";
            if (newChannel.type === "GUILD_TEXT") type = "Text Channel";
            if (newChannel.type === "GUILD_VOICE") type = "Voice Channel";

            let embed = new Discord.MessageEmbed()
              .setColor(data.plugins.logs.channelUpdate.color)
              .setAuthor({ name: guild.name, urlIcon: guild.iconURL() })
              .addField("Channel", `${newChannel}`, true)
              .setFooter(`Channel ID: ${newChannel.id}`)
              .setTimestamp();
            if (oldChannel.name !== newChannel.name) {
              embed.addFields({
                name: "Name Update",
                value: `${oldChannel.name} --> ${newChannel.name}`,
              });
            } else {
              embed.addFields({
                name: "Name Update",
                value: `Name not updated`,
              });
            }
            if (oldChannel.topic || newChannel.topic) {
              if (oldChannel.topic !== newChannel.topic) {
                embed.addFields({
                  name: "Topic",
                  value: `${oldChannel.topic || "none"} --> ${
                    newChannel.topic || "none"
                  }`,
                });
              }
            }

            if (oldChannel.nsfw || newChannel.nsfw) {
              if (oldChannel.nsfw !== newChannel.nsfw) {
                embed.addFields({
                  name: "NSFW",
                  value: `${oldChannel.nsfw} --> ${newChannel.nsfw}`,
                });
              }
            }
            let perms = [""];
            entry1.permissionOverwrites.channel
              .edit(entry1.target.id, {
                allow: perms.push(entry1.permsissinOverwrites.channel),
              })
              .then(() => {
                embed.addFields({ name: "update", value: `!9` });
              });

            if (oldChannel.rateLimitPerUser || newChannel.rateLimitPerUser) {
              if (oldChannel.rateLimitPerUser !== newChannel.rateLimitPerUser) {
                embed.addFields({
                  name: "Slowmode",
                  value: `${oldChannel.rateLimitPerUser} --> ${newChannel.rateLimitPerUser}`,
                });
              }
            }

            if (oldChannel.rateLimitPerUser === newChannel.rateLimitPerUser) {
              if (oldChannel.name === newChannel.name) {
                if (oldChannel.topic === newChannel.topic) {
                  if (oldChannel.nsfw === newChannel.nsfw) {
                    return;
                  }
                }
              }
            }
            if (
              channelEmbed &&
              channelEmbed.viewable &&
              channelEmbed
                .permissionsFor(newChannel.guild.me)
                .has(["SEND_MESSAGES", "EMBED_LINKS"])
            ) {
              channelEmbed.send({ embeds: [embed] }).catch(() => {});
              cooldown.add(newChannel.guild.id);
              setTimeout(() => {
                cooldown.delete(newChannel.guild.id);
              }, 2000);
            }
          }
        }
      }
    } catch (err) {
      return;
    }
  }
};
