
let Discord = require ('discord.js');

module.exports=class{
  async run(oldMember, newMember,member){
    
    if (newMember.bot) return;
    
let res = await User.findOneAndUpdate({userID: newMember.id})
const max = 3;
  const min = 1;
  const points = Math.floor(Math.random() * (max-min)) + min;
/*
data.voice.push({

      text: 0,
      voice: parseInt(Math.random() * 10),
      msgs: 0,
      id: newMember.id
    })
    data.save();*/
      // Get the server data
  let index = res.data.voice.findIndex(x => x.id === newMember.guild.id);
  let serverdata;

  // Add serverdata to profile if it doesn't exist yet
  // -1 means the index couldn't be found
  if (index === -1){
    res.data.voice.push({
      id: newMember.guild.id,
      voice: 0,
      level: 1
    });
    
    index =res.data.voice.findIndex(x => x.id === newMember.guild.id);
    [ serverdata ] = res.data. voice.splice(index,1);
  } else {
    [ serverdata ] = res.data.voice.splice(index,1);
  };
    
    
    if (oldMember.voiceChannel && newMember.voiceChannel) {
    var addXP = setInterval(async function() {
     let _xp = {
      
      local: {
      get cap(){ return (50 * Math.pow(serverdata.level,2)) + (250 * serverdata.level); },
      get next(){ return this.cap - serverdata.voice}
    }}
res.data.voice = res.data.voice + 3;
  while (_xp.global.next < 1){
    res.data.voice++
  }
      res.data.voice.splice(index, 0, serverdata);

  // Save the new data
  return res.save()
  .then(() => {
    xp.set(message.author.id, {});
    setTimeout(() => xp.delete(newMember.id), 60000);
    return { xpAdded: true, reason: null };
  })
  .catch(() => {
    return { xpAdded: false, reason: 'DB_ERROR_ON_SAVE' }
  });
    
      if (!newMember.voiceChannel) {
        clearInterval(addXP);
      }
    }, 600);
  }

  
  
    
    
    
    
    
    
  }}