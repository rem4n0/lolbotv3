
let Discord = require ('discord.js');

module.exports=class{
  async run(oldMember, newMember,member){
    
    if (newMember.author.bot) return;
    
let data = await Guild.fndOneAndUpdate({guildID: newMember.guild.id})


data.voice.push({

  text: 0,
      voice: parseInt(Math.random() * 10),
      msgs: 0,
      id: newMember.user.id
    })
    if (!oldMember.voiceChannel && newMember.voiceChannel) {
    var addXP = setInterval(async function() {
    data.guildID.voice += parseInt(
        Math.random() * 4
      );
     data.save();
      if (!newMember.voiceChannel) {
        clearInterval(addXP);
      }
    }, 60000);
  }

  
  
    
    
    
    
    
    
  }}