
let Discord = require ('discord.js');

module.exports=class{
  async run(oldMember, newMember,member){
    
    if (newMember.bot) return;
    
let data = await Guild.findOneAndUpdate({guildID: newMember.guild.id})
const max = 3;
  const min = 1;
  const points = Math.floor(Math.random() * (max-min)) + min;

data.voice.push({

      text: 0,
      voice: parseInt(Math.random() * 10),
      msgs: 0,
      id: newMember.id
    })
    data.save();
    
    if (!oldMember.voiceChannel && newMember.voiceChannel) {
    var addXP = setInterval(async function() {

      
      data.voice.voice += points
     data.save();
      if (!newMember.voiceChannel) {
        clearInterval(addXP);
      }
    }, 600);
  }

  
  
    
    
    
    
    
    
  }}