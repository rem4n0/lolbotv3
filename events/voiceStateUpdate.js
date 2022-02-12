module.exports=class{
  async run (oldMember,newMember){
    let data = await User.findOneAndUpdate({userID: newMember.id})
    const max =3
    const min= 1;
    const points = Math.floor(Math.random() * (max-min)) + min;

    let index = data.data.voice.findIndex(x => x.id === newMember.guild.id);
  let serverdata;

    if (index === -1){
    data.data.voice.push({
      id: newMember.guild.id,
      voice: 0,
      level: 1
    });
      
    index = data.data.voice.findIndex(x => x.id === newMember.guild.id);
    [ serverdata ] = data.data.voice.splice(index,1);
  } else {
    [ serverdata ] = data.data.voice.splice(index,1);
  };
    let _xp = {
  local: {
      get cap(){ return (50 * Math.pow(serverdata.level,2)) + (250 * serverdata.level); },
      get next(){ return this.cap - serverdata.voice }
    }
  };
   if (!oldMember.voiceChannel && newMember.voiceChannel) {
    var addXP = setInterval(async function() { 
serverdata.voice = serverdata.voice + points;
  while (_xp.local.next < 1){
    serverdata.level++
  };
     data.data.voice.splice(index, 0, serverdata);

  // Save the new data
  return data.save()
  .then(() => {
    xp.set(newMember.id, {});
    setTimeout(() => xp.delete(newMember.id), 60000);
    return { xpAdded: true, reason: null };
  })
  .catch(() => {
    return { xpAdded: false, reason: 'DB_ERROR_ON_SAVE' }
  })
    
   if (!newMember.voiceChannel) {
        clearInterval(addXP);
      } 
    
    },60000)}
    
  }}