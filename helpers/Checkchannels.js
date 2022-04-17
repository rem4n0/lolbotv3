const Discord = require("discord.js");

/* THIS CHECK IF THERE IS A USER TO UNMUTE */

module.exports = {
    
	/**
     * Starts checking...
     * @param {object} client The Discord Client instance
     */
	async init(bot){
await Channels.find({ "lock.locked": true }).then((channels) => {
			channels.forEach(async (channel) => {
      ///  const data = await Member.findOne({guildID:member.guildID})
			bot.databaseCache.lockedChannels.set(`${channel.id}${channel.guildID}`,channel);
			});
		});
    
    
    
  
		setInterval(async () => {
      
			bot.databaseCache.lockedChannels.filter((m) => m.lock.endDate <= Date.now()).forEach(async (channelData) => {
        if(!channelData.lock.locked) return;
				const guild = bot.guilds.cache.get(channelData.guildID);
				if(!guild) return;
				const channel = guild.channels.cache.get(channelData.id) || await guild.members.fetch(memberData.id).catch(() => {
					channelData.lock = {
						locked: false,
						endDate: null,
						case: null
					};
					channelData.save();
				//	client.logger.log("[unmute] "+memberData.id+" cannot be found.");
					return null;
				});
				const guildData = await Guild.findOneAndUpdate({ guildID: guild.id });
				guild.data = guildData;
				if(channel){
					guild.channels.cache.forEach((channel) => {/*
          
						const permOverwrites = channel.permissionOverwrites.cache.get(member.id);
						if(permOverwrites) permOverwrites.delete();
					});*/
            channel.permissionOverwrites.edit(channel.id, {
				SEND_MESSAGES: true,
				ADD_REACTIONS: true,
				CONNECT: true
			}).catch(() => {});
				})}
				const user = channel ? channel : await bot.channels.fetch(channelData.id);
				const embed = new Discord.MessageEmbed()
					.setDescription(`${user.toString()}Unmuted, case now ${channelData.lock.case}
					`)
					.setColor(config.embed.Color)
					.setFooter({text:config.embed.footer});
/*
				const channelr = guild.channels.cache.get(guildData.plugins.modlogs);
if(!channel) return;
				if(channel){
					channel.send({ embeds: [embed] });
				}*/
				channelData.lock = {
					locked: false,
					endDate: null,
					case: null
				};
				bot.databaseCache.lockedChannels.delete(`${channelData.id}${channelData.guildID}`);
				await channelData.save();
			});
		}, 1000 * 5);
	}
  }