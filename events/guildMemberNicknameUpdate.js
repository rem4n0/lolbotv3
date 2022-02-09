const Discord = require('discord.js');
module.exports = class{
  async run(client, oldNickname, newNickname,member) {
    let data = await Guild.findOne({guildID: member.guild.id})
    const logChannel = member.guild.channels.cache.get(data.plugins.modlogs);
    if (!logChannel) return console.log('hhh')
    
    
    
    //member.channel.send({content:`ii`});
    const embed = new Discord.MessageEmbed()
    .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`**:writing_hand: nick name has been updated.**`)
    .addFields(
      {
        name:'old nickname',
        value:`${oldNickname}`,
      
      
      },
      {
        name:'new nickname',
        value:`${newNickname}`,
      }
      
      )
    .setTimestamp()
    .setFooter(member.guild.name, member.guild.iconURL({ dynamic: true }))
    return logChannel.send({ embeds: [embed] })
}}