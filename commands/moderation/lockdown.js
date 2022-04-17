const Discord = require("discord.js");
const ms = require("ms")

module.exports = {
  name: "lockdown",
  aliases: ["closeall", "lockall", "lock all","lockdown"],
  description: "Locks all text channels from your server",
  usage: ["s!lockall"],
  category: ["Moderation"],
  enabled: true,
  memberPermissions: ["MANAGE_CHANNELS","SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS"],
  ownerOnly: false,
  cooldown: 6000,
  run: async (bot, message, args, dev,data) => {
    const channels = message.guild.channels.cache;
  const channelData = await Channels.findOneAndUpdate({ id: channels.id, guildID: message.guild.id });

  const time = args[1];
		if(!time || isNaN(ms(time))){
			return message.channel.send({content:`time must include (10s,10m,10h,1mon`})
		}
let reason = args.slice(3).join(" ");


    message.guild.channels.cache
      .filter((c) => c.type ==="GUILD_TEXT")
      .forEach(async (channel) => {
        channel.permissionOverwrites.edit(message.guild.id, {
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false,
        });
      });
    message.channel.send({content:` I locked all channels`}).catch(err =>{
      message.channel.send({content:`I cant locke all ${err.name}`}).catch(err =>{
        message.author.send({content:` i cant lock all channels ${err.name}`})})})
    if(time){

		data.guild.casesCount++;

		const caseInfo = {
			channel: message.channel.id,
			moderator: message.author.id,
			date: Date.now(),
			type: "lock",
			case: data.guild.casesCount,
			reason,
			time
		};

		channelData.lock.locked = true;
	channelData.lock.endDate = Date.now()+ms(time);
		channelData.lock.case = data.guild.casesCount;
		channelData.sanctions.push(caseInfo);

		channelData.markModified("sanctions");
		channelData.markModified("lock");
		await channelData.save();

		await data.guild.save();

		bot.databaseCache.mutedUsers.set(`${channels.id}${message.guild.id}`, channelData);}
    
        /// send to log channel
  /*  const channelEmbed = await message.guild.channels.cache.get(data.guild.plugins.modlogs)

      if(!channelEmbed) return;
    const embed = new Discord.MessageEmbed()
    .setDescription(`:pencil: **Lockdown Action**`)
    .addField('Moderator Name', message.author.toString(), true)
    .setFooter({text:message.guild.name})
    .setThumbnail(message.guild.iconURL())
    .setTimestamp()
    .setColor(config.embed.Color)
  
   
   
        if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
            channelEmbed.send({embeds:[embed]}).catch((err)=>{console.log(err)})
          
            setTimeout(()=>{
            }, 3000)
      }
    */
  }
};
