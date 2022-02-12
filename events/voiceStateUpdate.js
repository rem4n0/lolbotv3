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
      xp: 0,
      level: 1
    });
    index = data.data.xp.findIndex(x => x.id === newMember.guild.id);
    [ serverdata ] = data.data.voice.splice(index,1);
  } else {
    [ serverdata ] = res.data.xp.splice(index,1);
  };
    
    data.data.voice.push({
      id: newMember.guild.id,
      voicexp,
      
      
      
    }) 
    
  }}