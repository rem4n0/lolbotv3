const guilds = require(`${process.cwd()}/data/guild`);
const Resolve = require(`${process.cwd()}/helpers/resolvers`)
module.exports = {
  name: "setxpch",
  aliases: ["setxpmessage","xpmessage","setchannelxp","setxpch","xpch"],
  enabled: true,			    
  memberPermissions: [ "MANNAGE_GUILD" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  ownerOnly: false,			
  guildOwner:false,
  cooldown: 8000,
  run: async (bot, message, args) => {
  const data = await Guild.findOneAndUpdate({guildID: message.guild.id});
  
   if (!data){
      data.guild = new Guild({guildID: message.guild.id });
    };

    const channelID = await Resolve.resolveChannel({
      message: message,
      search: args.slice(1).join(''),
      channelType: "GUILD_TEXT"})
          
          
     if(!channelID){
      
      
      return message.reply({content:`I can't find this channel check my permission or try again`})
    }
    
    data.channels.xp = channelID.id;
    data.markModified('channels.xp');
    return data.save()
    
      return message.channel.send({content:`✔️ Successfully set the xp channel to ${channelID}!`})
    
    .catch(() => message.channel.send({content:`\`❌ [DATABASE_ERR]:\` Unable to save the document to the database, please try again later!`}))
  }}