
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const player = require("../../handler/player")
module.exports = {
  name: "nowplayng",
  aliases: ["np","nowplaying"],
  usage: ["Bonowplaying"],
  description: "show your songs now ",
  category: "music",
  enabled: true,
  ownerOnly: false,
  cooldown: 6000,
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  memberPermissions: ["SEND_MESSAGES"],
  run: async (client, message, args) => {

           const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({content:`No music currently playing ${message.author}... try again ? ❌`});

        const track = queue.current;

        const embed = new MessageEmbed();

        embed.setColor('RED');
        embed.setThumbnail(track.thumbnail);
        embed.setAuthor({name:track.title});

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

        embed.setDescription({content:`Volume **${queue.volume}**%\nDuration **${trackDuration}**\nLoop mode **${methods[queue.repeatMode]}**\nRequested by ${track.requestedBy}`});

        embed.setTimestamp();
   //     embed.setFooter('Music comes first - Made with heart by Zerio ❤️', message.author.avatarURL({ dynamic: true }));

        const saveButton = new MessageButton();

        saveButton.setLabel('Save this track');
        saveButton.setCustomId('saveTrack');
        saveButton.setStyle('SUCCESS');

        const row = new MessageActionRow().addComponents(saveButton);

        message.channel.send({ embeds: [embed], components: [row] });
    }, 
    
    
    
    
    
  }