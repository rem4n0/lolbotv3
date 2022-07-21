const player = require("../../handler/player.js");
const Discord = require("discord.js");
module.exports = {
  name: "stop",
  aliases: ["stop"],
  usage: ["Bostop"],
  description: "stop song",
  category: "music",
  enabled: true,
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  enabled: true,
  category: ["music "],
  ownerOnly: false,
  cooldown: 10000,
  prime: false,
  run: async (interaction, args) => {
    
    
    
    
    if (! interaction.member?.voice?.channel) {
      return interaction.reply({ content: `You are not in same channel` });
    }

    const queue = player.getQueue(interaction.guildId);
    const embed = new Discord.MessageEmbed().setDescription(
      "There is no any songs to stop"
    );
    if (!queue?.playing) {
      return interaction.followUp({ embeds: [embed] });
    }

    queue.stop();
    message.reply({ content: `Stopped 🚫` });
  },
};
