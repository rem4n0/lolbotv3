const Discord = require('discord.js')



module.exports = {
    name: "filter",
    aliases: ["filter","f"],
    description: "adding filters for your songs",
    usage: ["ban [@User]"],
    category: ["moderation"],
    enabled: true,
    memberPermissions: ["BAN_MEMBERS"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "BAN_MEMBERS"],
    ownerOnly: false,
    cooldown: 6000,
  run: async (bot, message, args, dev,player) => {
    const queue = player.getQueue(message.guild.id);
    
if (!queue || !queue.playing) return message.channel.send({content:`No music currently playing ${message.author}... try again ? ❌`});
const actualFilter = queue.getFiltersEnabled()[0];
if (!args[1]) return message.channel.send({content:`Please specify a valid filter to enable or disable ${message.author}... try again ? ❌\n${actualFilter ? `Filter currently active ${actualFilter} (${config.app.px}filter ${actualFilter} to disable it).\n` : ''}`});

        const filters = [];
    
  }}