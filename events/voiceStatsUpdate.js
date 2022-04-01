module.exports = class{
  
  async run(oldState, newState) {
    let data = await User.findOne({userID: newState.author.id});
  if (newState.author.bot) return;
    /*
  if (!top[newMember.guild.id])
 top[newMember.guild.id] = {};
  if (!top[newMember.guild.id][newMember.user.id])
    top[newMember.guild.id][newMember.user.id] = 
  if(!data) data.data.voice={
       level:0,
      voice: parseInt(Math.random() * 10),
  
      id: newState.guild.id
    };*/
let index = data.data.voice.findIndex(x => x.id === newState.guild.id);
  let serverdata;

  // Add serverdata to profile if it doesn't exist yet
  // -1 means the index couldn't be found
  if (index === -1){
    data.data.voice.push({
      id: newState.guild.id,
      xp: 0,
      level: 1
    });
    index = data.data.voice.findIndex(x => x.id === newState.guild.id);
    [ serverdata ] = data.data.voice.splice(index,1);
  } else {
    [ serverdata ] = data.data.voice.splice(index,1);
  };
    let _xp={
local: {
      get cap(){ return (50 * Math.pow(serverdata.level,2)) + (250 * serverdata.level); },
      get next(){ return this.cap - serverdata.xp }
    }
  };
  if (!oldState.voiceChannel && newState.voiceChannel) {
    var addXP = setInterval(async function() {
      serverdata.xp = serverdata.xp + 1;
while (_xp.local.next < 1){
    serverdata.level++
}
      data.data.voice.splice(index, 0, serverdata);

    return data.save();
      if (!newMember.voiceChannel) {
        clearInterval(addXP);
      }
    }, 60000);
  }}}