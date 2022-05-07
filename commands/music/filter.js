const Discord = require('discord.js')


const player = require("../../handler/player.js")
module.exports = {
    name: "filter",
    aliases: ["filter","f"],
    description: "adding filters for your songs",
    usage: ["filter [filter_name]"],
    category: ["music"],
    enabled: true,
    memberPermissions: ["SEND_MESSAGES"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    ownerOnly: false,
    cooldown: 6000,
  run: async (bot, message, args, dev) => {
    const queue = player.getQueue(message.guild.id);
    if(!message.member.voice.channel){ return message.reply({content:`You cant use filter`})}
if (!queue || !queue.playing) return message.channel.send({content:`No music currently playing ${message.author}... try again ? ❌`});
const actualFilter = queue.getFiltersEnabled()[0];
if (!args[1]) return message.channel.send({content:`Please specify a valid filter to enable or disable ${message.author}... try again ? ❌\n${actualFilter ? `Filter currently active ${actualFilter} (filter ${actualFilter} to disable it).\n` : ''}`});

        const filters = [];
    queue.getFiltersEnabled().map(x => filters.push(x));
        queue.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === args[1].toLowerCase());

        if (!filter) return message.channel.send({content:`This filter doesn't exist ${message.author}... try again ? ❌\n${actualFilter ? `Filter currently active ${actualFilter}.\n` : ''}List of available filters ${filters.map(x => `**${x}**`).join(', ')}.`});

        const filtersUpdated = {};

        filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

        await queue.setFilters(filtersUpdated);

        message.channel.send({content:`The filter ${filter} is now **${queue.getFiltersEnabled().includes(filter) ? 'enabled' : 'disabled'}** ✅\n*Reminder the longer the music is, the longer this will take.*`});
  }}