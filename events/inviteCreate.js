module.exports = class{
  
  async run(bot, guildInvite){
    
   let data = await Guild.findOne({guildID: guildInvite.guild.id});
console.log(data);
    if(!data) return;
    if(data){
    data.invites.push({
      id: guildInvite.inviter.id,
      code: guildInvite.code,
        uses: guildInvite.uses,
    })
    data.save();
    
    
    }
    console.log("role")
    
    
  }}