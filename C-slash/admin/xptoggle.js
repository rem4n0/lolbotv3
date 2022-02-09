const Discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Color } = config.embed.Color;
module.exports = {
  name: "xptoggle",
  description: "xp toggle",
  options: [
    {
      StringChoices: {
        name: "xp",
        description: "what's you want to system",
        required: true,
        choices: [
          [ "enable xp system","on"],
          ["disable xp system","off"],
        ],
      },
    },
  ],

  category: ["admin"],
  memberPermissions: ["SEND_MESSAGES", "MANAGE_GUILD"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: false,
  enabled: true,
  cooldown: 1000,
  prime: false,
  run: async (interaction, bot) => {
    const toggle = interaction.options.getString("xp");
const data = await Guild.findOneAndUpdate({guildID: interaction.guild.id})
    if (toggle === "on") {
      data.xp.onoff = "on";
      data.save();
      return interaction.reply({ content: `xp system enabled in the server` });
    }

    if (toggle === "off") {
      data.xp.onoff = "off";
      data.save();
      return interaction.reply({
        content: ` Xp system from guild is disabled`,
      });
    }

    return interaction.reply({ content: `error syntax [on,off] ` });
  },
};
