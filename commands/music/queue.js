const Discord = require("discord.js");
const { QueryType } = require("discord-player");
const player = require("../../handler/player");
const emojis = require("../../util/emojis.json");


const talkedRecently = new Set();
module.exports = {
  name: "queue",
  aliases: ["queue"],
  usage: ["prefix + queue"],
  description: "Showed your queue",
  category: "music",
  enabled: true,
  ownerOnly: false,
  cooldown: 6000,
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  memberPermissions: ["SEND_MESSAGES"],
  run: async (client, message, args) => {


    const queue = player.getQueue(message.guildId);
    
    if (!queue?.playing)
      return message.reply({content:`There is nothing working, there is no song currently playing in this server `
      });

    const currentTrack = queue.current;
    const tracks = queue.tracks.slice(0, 10).map((m, i) => {
      return `${i + 1}. [**${m.title}**](${m.url}) - `${m.requestedBy.tag}`;
    });

    const songQueue = new Discord.MessageEmbed()
      .setColor(config.embed.Color)
      .setTitle("Here's your queue!")
      .setDescription(
        `${tracks.join("\n")}${
          queue.tracks.length > tracks.length
            ? `\n...${
                queue.tracks.length - tracks.length === 1
                  ? `${queue.tracks.length - tracks.length} more track`
                  : `${queue.tracks.length - tracks.length} more tracks`
              }`
            : ""
        }`
      )
      .addField("Currently Playing",
        `[**${currentTrack.title}**](${currentTrack.url}) - ${currentTrack.requestedBy.tag}`,
        true
      )
      .setTimestamp()
      .setFooter("Requested by " + message.member.user.tag);

    return message.channel.send({embeds:[songQueue] });}}