const Discord = require("discord.js");
const { QueryType } = require("discord-player");
const player = require("../../handler/player");

const talkedRecently = new Set();
module.exports = {
  name: "play",
  aliases: ["play"],
  usage: ["Boplay"],
  description: "Play your favorite music or anything you want",
  category: "music",
  enabled: true,
  ownerOnly: false,
  cooldown: 6000,
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  memberPermissions: ["SEND_MESSAGES"],
  run: async (client, message, args) => {


    const songSearch = args.slice(1).join("");
    
      
    if (!songSearch)
      return message.reply({content:"You didn't provide me a name of song to play!"
      });


    if (!message.member.voice.channel)
      return message.reply({content:" You need to join a voice channel for me to play song!"
      });

    const searchResult = await player.search(songSearch, {
      requestedBy: message.member.user,
      searchEngine: QueryType.AUTO,
    });

    
    if (!searchResult || !searchResult.tracks.length)
      return message.reply({content:" Hmm, I couldn't quite find the song you requested for; try playing another one!"});

    const queue = player.createQueue(message.guild, {
      metadata: message.channel,
       // disabling volume controls can improve performance
            leaveOnEnd: false,
			leaveOnStop: false,
            spotifyBridge: false

      
    });

    
    try {
      if (!queue.connection) await queue.connect(message.member.voice.channel);
    } catch {
      await player.deleteQueue(message.guild.id);
      
      queue.destroy();
      return message.reply({content:"There was an error with your request, please trye again later!" });
    }/*
    if (searchResult) {
      queue.addTracks(searchResult.tracks);
    } else {
      queue.addTrack(searchResult.tracks[0]);
    }
    */
    searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);

    
  
    if (!queue.playing) await queue.play();
  },
};
