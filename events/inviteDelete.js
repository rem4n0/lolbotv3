module.exports = class{
  
  async run(bot, guildInvite){
   let data = await Guild.findOne({guildID: guildInvite.guild.id});

    if(!data) return;
    if(data){
    data.deleteOne(data.invites.code);
    
    }
    
    
  }}