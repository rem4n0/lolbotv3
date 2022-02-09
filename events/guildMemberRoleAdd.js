const Discord = require('discord.js');
module.exports = class{
  async run(client, member, role) {
    let data = await Guild.findOne({guildID: member.guild.id})
    const logChannel = member.guild.channels.cache.get(data.plguins.modlogs);
    if (!logChannel) return member.channel.send({content:`ii`});
    const embed = new Discord.MessageEmbed()
    .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`**:writing_hand: ${member} roles has been updated.**`)
    .addField("Role:", `✅ ${role.name}`)
    .setTimestamp()
    .setFooter(member.guild.name, member.guild.iconURL({ dynamic: true }))
    return logChannel.send({ embeds: [embed] })
}}