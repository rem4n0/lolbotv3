


module.exports= class{
  async run(oldStats,newStats){
    let res = await User.findOne({userID: newStats.id});
    
    
      
      
      let index = res.data.voice.findIndex(x => x.id === newStats.guild.id);
  let serverdata;
const max = 2;
  const min = 1;
  const points = Math.floor(Math.random() * (max-min)) + min;
if (!(res instanceof User)){
    return promise.resolve({ xpAdded: false, reason: 'DB_ERROR'})
  };

  // Add serverdata to profile if it doesn't exist yet
  // -1 means the index couldn't be found
  if (index === -1){
    res.data.voice.push({
      id: newStats.guild.id,
      voicexp: 0,
      level: 1
    });
  
    index = res.data.voice.findIndex(x => x.id === newStats.guild.id);
    [ serverdata ] = res.data.voice.splice(index,1);
  } else {
    [ serverdata ] = res.data.voice.splice(index,1);
  };
    let _xp={
    local: {
      get cap(){ return (50 * Math.pow(serverdata.level,2)) + (250 * serverdata.level); },
      get next(){ return this.cap - serverdata.voice }
    }};
if (!oldStats.channel && newStats.channel) {
    var addXP = setInterval(async function() {
serverdata.voice = serverdata.voice + points;
  while (_xp.local.next < 1){
    serverdata.level++
  };

    res.data.voice.splice(index, 0, serverdata);
  res.save().then(() => {
    xp.set(newStats.id, {});
    setTimeout(() => xp.delete(newStats.id), 60000);
    return { xpAdded: true, reason: null };
  })
  .catch(() => {
    return { xpAdded: false, reason: 'DB_ERROR_ON_SAVE' }
  });
    
      if (!newStats.channel) {
       clearInterval(addXP);
      }
    }, 6000);
  }

      
    
    
  
    
    
  }}