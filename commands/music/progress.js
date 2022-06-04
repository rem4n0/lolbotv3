const player = require("../../handler/player")

module.exports = {
    name: "progress",
    aliases: ["progress"],
    description: "show you progress bar of song",
    usage: ["Boprogress"],
    category: ["music"],
    enabled: true,
    memberPermissions: ["SEND_MESSAGES"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    ownerOnly: false,
    cooldown: 6000,
    run: async (message) => {
      const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({content:`No music currently playing ${message.author}... try again ? ❌`});

        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();

        if (timestamp.progress == 'Infinity') return message.channel.send({content:`Playing a live, no data to display 🎧`});

        message.channel.send({content:`${progress} (**${timestamp.progress}**%)`})

    }}
