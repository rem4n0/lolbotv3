const Discord = require("discord.js");
const { QueryType } = require("discord-player");
const player = require("../../handler/player");

const talkedRecently = new Set();
module.exports = {
  name: "skip",
  aliases: ["skip"],
  usage: ["Boskip"],
  description: "skip songs to other aongs in queue",
  category: "music",
  enabled: true,
  ownerOnly: false,
  cooldown: 6000,
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  memberPermissions: ["SEND_MESSAGES"],
  run: async (client, message, args) => {



    const queue = player.getQueue(message.guildId);
    if (!queue?.playing)
      return message.reply({content:` Thers is no music currently beign played`
      });
const current = queue.current;
    queue.skip();

    const Skipped = new Discord.MessageEmbed()
      .setColor(config.embed.Color)
      .setTitle("Skipping")
      .setDescription(`I've successfully skipped the ${current}, next song it is!`)
      .setTimestamp()
      .setFooter("Requested by " + message.member.user.tag);

    message.reply({ embeds: [Skipped] });}}