const player = require("../../handler/player");


module.exports = {
  name: "pause",
  aliases: ["pause"],
  usage: ["Bo pause"],
  description: "Pause current song",
  category: "music",
  enabled: true,
  ownerOnly: false,
  cooldown: 6000,
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  memberPermissions: ["SEND_MESSAGES"],
  run: async (client, message, args) => {
if(!message.member.voice.channel){ return message.reply({content:`You cant pause songs `})}
        const queue = player.getQueue(message.guild.id);

        if (!queue) return message.channel.send({content:`No music currently playing ${message.author}... try again ? ❌`});

        const success = queue.setPaused(true);
        return message.channel.send({content: `Current music ${queue.current.title} paused ✅`});
  }}