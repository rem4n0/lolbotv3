const Discord = require('discord.js')


const player = require("../../handler/player.js")
module.exports = {
    name: "filter",
    aliases: ["filter","f"],
  
    description: "adding filters for your songs",
    usage: ["filter [filter_name]"],
  options:[{
    
    String:{
      name:"filter",
      description:"add_filter_by_name",
      required:true,
      
    }}],
    category: ["music"],
    enabled: true,
    memberPermissions: ["SEND_MESSAGES"],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    ownerOnly: false,
    cooldown: 6000,
  run: async (bot, interaction, args, dev) => {
    const queue = player.getQueue(interaction.guildId);
    if(!interaction.member.voice.channel){ return interaction.reply({content:`You cant use filter`})}
if (!queue || !queue.playing) return interaction.reply({content:`No music currently playing ${message.author}... try again ? ❌`});
const actualFilter = queue.getFiltersEnabled()[0];
    interaction.deferReply()
if (!args[1]) return interaction.channel.send({content:`Please specify a valid filter to enable or disable ${message.author}... try again ? ❌\n${actualFilter ? `Filter currently active ${actualFilter} (filter ${actualFilter} to disable it).\n` : ''}`});

        const filters = [];
    queue.getFiltersEnabled().map(x => filters.push(x));
        queue.getFiltersDisabled().map(x => filters.push(x));

        const filter = await interaction.options.getString("filter");/// filters.find((x) => x.toLowerCase() === args[1].toLowerCase());

        if (!filter) return interaction.channel.send({content:`This filter doesn't exist ${interaction.user.tag}... try again ? ❌\n${actualFilter ? `Filter currently active ${actualFilter}.\n` : ''}List of available filters ${filters.map(x => `**${x}**`).join(', ')}.`});

        const filtersUpdated = {};

        filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

        await queue.setFilters(filtersUpdated);

        interaction.channel.send({content:`The filter ${filter} is now **${queue.getFiltersEnabled().includes(filter) ? 'enabled' : 'disabled'}** ✅\n*Reminder the longer the music is, the longer this will take.*`});
  }}