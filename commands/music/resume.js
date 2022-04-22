
const player = require("../../handler/player");

module.exports = {
  name: "resume",
  aliases: ["resume"],
  usage: ["resume"],
  description: "resume current song",
  category: "music",
  enabled: true,
  ownerOnly: false,
  cooldown: 6000,
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  memberPermissions: ["SEND_MESSAGES"],
  run: async (client, message, args) => {


const queue = player.getQueue(message.guild.id);

        if (!queue) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        const success = queue.setPaused(false);

        return message.channel.send({content:`Current music ${queue.current.title} resumed`});}}