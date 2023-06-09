const Discord = require("discord.js");

const { MessageEmbed } = require('discord.js');

const moment = require('moment');

const filterLevels = {

	DISABLED: 'Off',

	MEMBERS_WITHOUT_ROLES: 'No Role',

	ALL_MEMBERS: 'Everyone'

};

const verificationLevels = {

	NONE: 'None',

	LOW: 'Low',

	MEDIUM: 'Medium',

	HIGH: '(╯°□°）╯︵ ┻━┻',

	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'

};

const regions = {

	brazil: 'Brazil',

	europe: 'Europe',

	hongkong: 'Hong Kong',

	india: 'India',

	japan: 'Japan',

	russia: 'Russia',

	singapore: 'Singapore',

	southafrica: 'South Africa',

	sydeny: 'Sydeny',

	'us-central': 'US Central',

	'us-east': 'US East',

	'us-west': 'US West',

	'us-south': 'US South'

};

module.exports = {
  name: "serverinfo",
  aliases: ["server"],
  enabled: true,
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: false,
  cooldown: 3000,
  run: async (bot, message, args, dev) => {

		const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());

        
		const members = message.guild.members.cache;

	        let guild = await Guild.findOne({ guildID: message.guild.id });
		
                const channel = message.guild.channels.cache.size;
	       
                const channels = message.guild.channels.cache;

		const emojis = message.guild.emojis.cache;

		const embed = new MessageEmbed()
                        .setTitle("Guild information")
			.setColor(config.embed.Color)
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.addField("Name", `${message.guild.name}`)
                        .addField("ID", `${message.guild.id}`)
                        .addField("Owner", `<@${message.guild.ownerId}>`)
                        .addField("Region", `${regions[message.guild.region]}`)
                        .addField("Explicit Filter", `${filterLevels[message.guild.explicitContentFilter]}`)
                        .addField("Verification Level", `${verificationLevels[message.guild.verificationLevel]}`)
                        .addField("Time Created", `${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`)
                        .addField("Role Count", `${roles.length}`)
                        .addField("Boost Count", `${message.guild.premiumSubscriptionCount || '0'}`)
                        .addField("Member Count", `${message.guild.memberCount}`)
                        .addField("Bots", `${members.filter(member => member.user.bot).size}`)
                        .addField(`Channels`, `(${channel})`)
                        .addField("Emoji Count", `${emojis.size}`)


	      message.channel.send({embeds: [embed] });

	}

}
