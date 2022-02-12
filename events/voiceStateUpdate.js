


module.exports= class{
  async run(oldStats,newStats){
    let res = await User.findOneAndUpdate({userID: newStats.id});
    
    
      
      
      let index = res.data.voice.findIndex(x => x.id === newStats.guild.id);
  let serverdata;

  // Add serverdata to profile if it doesn't exist yet
  // -1 means the index couldn't be found
  if (index === -1){
    res.data.xp.push({
      id: newStats.guild.id,
      voice: 0,
      level: 1
    });
    index = res.data.xp.findIndex(x => x.id === newStats.guild.id);
    [ serverdata ] = res.data.voice.splice(index,1);
  } else {
    [ serverdata ] = res.data.voice.splice(index,1);
  };
if (!oldStats.voiceChannel && newStats.voiceChannel) {
    var addXP = setInterval(async function() {
    res.data.voice += parseInt(
        Math.random() * 4)
      
      
      
res.save();
      if (!newStats.voiceChannel) {
        clearInterval(addXP);
      }
    }, 600);
  }

      
    
    
  
    
    
  }}