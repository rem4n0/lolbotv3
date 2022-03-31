const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  name:"setcolor",
  description:'set profile color',
  options:[{
    String:{
      name:"hex_code",
      description:" put hex color code",
      required:true,
    }}],
  enabled: false,
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  enabled: true,
  category: ["rank"],
  ownerOnly: false,
  cooldown: 10000,
  prime: false,
  run: async (interaction, bot, data) => {
    const hex = await interaction.options.getString("hex_code");

    data.user.attch.color = hex === "default" ? null : String("#" + hex);
    data.user.money -= 1000;
    return data.user
      .save()
      .then(() =>
        interaction.reply({
          content: `✅ **${interaction.user.tag}**, your profile color has been updated to **${hex}**! And paided $1000 for change color`,
        })
      )
      .catch(() =>
        interaction.reply({
          content: `❎ **${interaction.user.tag}**, your profile color update failed!`,
        })
      );
  },
};
