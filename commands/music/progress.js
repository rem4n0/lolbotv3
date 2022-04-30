const player = require("../../handler/player")

module.exports = {
    name: "progress",
    aliases: ["progress"],
    description: "You can ban a member, or multiple members using this command",
    usage: ["ban [@User]"],
    category: ["moderation"],
    enabled: true,
    memberPermissions: ["BAN_MEMBERS"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "BAN_MEMBERS"],
    ownerOnly: false,
    cooldown: 6000,
    run: async (bot, message, args, dev) => {
      const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({content:`No music currently playing ${message.author}... try again ? ❌`});

        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();

        if (timestamp.progress == 'Infinity') return message.channel.send({content:`Playing a live, no data to display 🎧`});

        message.channel.send({content:`${progress} (**${timestamp.progress}**%)`})

    }}