module.exports = {

name:"avatar",
  description:"avatar images",
  options:[{
    User:{
      name:"target",
      description:"target someone",
      required:false,
      
      
    }
    
    
    
  }],
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["general"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {
