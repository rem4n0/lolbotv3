const maxVol = config.music.maxV

const player = require("../../handler/player.js")
module.exports = {
  name: "volume",
  aliases: ["volume","v"],
  description: "change a custom volume of songs",
  usage: ["Bovolume [number]"],
  category: ["music"],
  enabled: true,
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: false,
  cooldown: 6000,
  run: async (bot, message, args, dev) => {
    const queue = player.getQueue(message.guild.id);

    if (!queue || !queue.playing)
      return message.channel.send({content:
        `No music currently playing ${message.author}... try again ? ❌`}
      );
if(! message.member.voice.channel){ return message.reply({content:`You can't change volume because you are not in my voice channel`})}
    const vol = parseInt(args[1]);

    if (!vol)
      return message.channel.send({content:
        `The current volume is ${queue.volume} 🔊\n*To change the volume enter a valid number between **1** and **${maxVol}**.*`}
      );

    if (queue.volume === vol)
      return message.channel.send(
        `The volume you want to change is already the current one ${message.author}... try again ? ❌`
      );

    if (vol < 0 || vol > maxVol)
      return message.channel.send(
        `The specified number is not valid. Enter a number between **1** and **${maxVol}** ${message.author}... try again ? ❌`
      );

    const success = queue.setVolume(vol);

    return message.channel.send(
      success
        ? `The volume has been modified to **${vol}**/**${maxVol}**% 🔊`
        : `Something went wrong ${message.author}... try again ? ❌`
    );
  }, 
};
