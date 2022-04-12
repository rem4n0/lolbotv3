const Discord = require('discord.js')
const player = new Player(bot, {
   ytdlOptions: { 
      filter: "audioonly",
      opusEncoded: "true",
     
     
     
      quality: 'highestaudio',
      highWaterMark: 1 << 30,
    } 
});
 
player.on("error", (queue, error) => {
  console.log(
    `[${queue.guild.name}] Error emitted from the queue: ${error.message}`
  );
});

player.on("connectionError", (queue, error) => {
  console.log(
    `[${queue.guild.name}] Error emitted from the connection: ${error.message}`
  );
});

player.on("trackStart", (queue, track) => {
  const trackStart = new Discord.MessageEmbed()
  
    .setTitle("Senpai~ I'm playing a new song! " )
    .addField( " Song title", "```" + track.title + "```", true)
    .addField(
    " Queued by",
      "```" + track.requestedBy.tag + "```",
      true
    )
    .setDesc

  queue.metadata.send({content: track.title + " " + "Added By" + " " + track.requestedBy.tag + ""+track.timecodes+"" + `added To BoBoQueue \`\`(${track.duration})\`\`` 
                      });
});

player.on("trackAdd", (queue, track) => {
  const trackAdd = new Discord.MessageEmbed()
    
    .setTitle("Senpai~ Added a new song to the queue! ")
    .addField( " Song title", "```" + track.title + "```", true)
    .addField(
   " Queued by",
      "```" + track.requestedBy.tag + "```",
      true
    )
    .setDescription(
      "I can be found in `" +
        queue.connection.channel.name +
        "` If you want to join the party!"
    )
    .setFooter("Automated Message")
    .setTimestamp();

  queue.metadata.send({ embeds: [trackAdd] });
});

player.on("botDisconnect", (queue) => {
  const botDisconnect = new Discord.MessageEmbed()
    
    .setTitle("Senpai~ I've been disconnected! ")
    .setDescription(
      "```" +
        "I was disconnected from the voice channel, queue was cleared!" +
        "```"
    )
    .setTimestamp();

  queue.metadata.send({ embeds: [botDisconnect] });
  queue.destroy(true);
});

player.on("channelEmpty", (queue) => {
  const channelEmpty = new Discord.MessageEmbed()
  
    .setTitle("Senpai~ Where did everyone go?! " )
    .setDescription(
      "I was left alone in `" +
        queue.connection.channel.name +
        "`, I've left the voice channel due to everyones absence!"
    )
    .setTimestamp();

  queue.metadata.send({ embeds: [channelEmpty] });
  queue.destroy(true);
});

player.on("queueEnd", (queue) => {
  const queueEnd = new Discord.MessageEmbed()
    .setColor(config.embedColor)
    .setTitle("Senpai~ Queue completed! ")
    .setDescription(
      "Party is over, I've completed every song that was in the queue! I've left the following voice channel, although you can always add me back senpai! ```" +
        queue.connection.channel.name +
        "```"
    )
    .setTimestamp();

  queue.metadata.send({ embeds: [queueEnd] });
  queue.destroy(true);
})
module.exports = player;