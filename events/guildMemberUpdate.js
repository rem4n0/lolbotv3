const Discord = require('discord.js');
module.exports = class{
  async run(oldMember,newMember) {
    const {guild} = newMember
  
  console.log(newMember)

    let data = await Guild.findOne({guildID: guild.id})
    const logChannel = guild.channels.cache.get(data.plugins.logs.channel)
    if (!logChannel) return;// member.channel.send({content:`ii`});
    
    /*
    if(!oldNickname && newNickname){
    const embed = new Discord.MessageEmbed()
    .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`**:writing_hand: ${member} roles has been updated.**`)
    .addFields(
      
      {
        name:'oldNickname',
        value:`${oldNickname}`,
      },
      {
        name:'newNickname',
        value:`${newNickname}`,}
      
      )
    .setTimestamp()
    .setFooter(member.guild.name, member.guild.iconURL({ dynamic: true }))
    return logChannel.send({ embeds: [embed] })
    }*/
    const newembed = new Discord.MessageEmbed()
    .setAuthor({name: newMember.guild.name, urlIcon: newMember.guild.iconURL({dynamic: true})})
  /*  if(oldMember){
newembed.addFields({ name: "oldRole", value:},
                { name:"newRole", value:})
      
    }*/
    logChannel.send({embeds:[newembed]})
  
  
  
  }}