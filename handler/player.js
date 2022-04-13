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
  

  queue.metadata.send({content: track.title + " " + "Added By" + " " + track.requestedBy.tag + ""+track.timecodes+"" + `added To BoBoQueue \`\`(${track.duration})\`\`` 
                      });
});

player.on("trackAdd", (queue, track) => {

  queue.metadata.send({ content: `  Searching 🔍 `});
});

player.on("botDisconnect", (queue) => {
  

  queue.metadata.send({ content:`Iam Disconnected From Voice` });
  queue.destroy(true);
});

player.on("channelEmpty", (queue) => {

  queue.metadata.send({ content: `I've left the voice channel due to everyones absence` });
  queue.destroy(true);
});

player.on("queueEnd", (queue) => {

  queue.metadata.send({ content:` Party is over , I've completed every songs that was in the queue! I've left the following voice channel, although you can always add me back` });
  queue.destroy(true);
})
player.on("connectionError",(queue,error)=>{
  queue.metadata.send({content: ` I have error from connection error:\`\`${error}\`\``})
  
  
})
module.exports = player;