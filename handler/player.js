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

player.on("trackAdd", (queue, track) => {


  queue.metadata.send({content:` Searching for ${track.title}`}).then((msg)=>{
  setTimeout(()=>{
    msg.delete();
    
  },5000)})
});/*
player.on("tracksAdd", (queue,tracks)=>{
  
  queue.metadata.send({content:` Added new Songs for queue ${tracks.title}`})
  
})*/
player.on("trackStart", (queue, track) => {
  
  
  
  let embed = new Discord.MessageEmbed()
  .setAuthor({name:track.author})
  .setTitle(track.title)
  .setThumbnail(track.thumbnail)
  .setTimestamp()
///  .setDescription(`${track.description}`||"don't have description")
  .setURL(track.url)

  

  queue.metadata.send({embeds: [embed]})
    


  
});

player.on("botDisconnect", (queue) => {
  
let embed = new Discord.MessageEmbed()
. setDescription (" Iam Disconnected From  Your Voice")
  queue.metadata.send({embeds:[embed]});
  queue.destroy(true);
});

player.on("channelEmpty", (queue) => {
let embed = new Discord.MessageEmbed()
.setDescription(`I've left the voice channel due to everyones absence`)
  queue.metadata.send({embeds:[embed]});
  queue.destroy(true);
});

player.on("queueEnd", (queue) => {

  queue.metadata.send({ content:` Party is over , I've completed every songs that was in the queue! I've left the following voice channel, although you can always add me back` });
 // queue.destroy(true);
})
player.on("connectionError",(queue,error)=>{
 /// queue.metadata.send({content: ` I have error from connection error:\`\`${error.name}\`\``})
console.log(error);  
  
})
module.exports = player;
