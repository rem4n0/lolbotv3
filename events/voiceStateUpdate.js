


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
if (!oldStats.channel && newStats.channel) {
    var addXP = setInterval(async function() {
    res.data.voice.voice +=  4,
      res.data.voice.id =newStats.guild.id
  
        
      
      
      
res.save();
      if (!newStats.channel) {
        clearInterval(addXP);
      }
    }, 600);
  }

      
    
    
  
    
    
  }}