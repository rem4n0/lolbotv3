const Discord = require('discord.js');
module.exports = class{
  async run(oldMember,newMember,old) {
    const {guild} = newMember
  
  console.log(newMember._roles)

    let data = await Guild.findOne({guildID: guild.id})
    const logChannel = guild.channels.cache.get(data.plugins.logs.channel)
    if (!logChannel) return;// member.channel.send({content:`ii`});
    
    
    if(!oldMember.nickname && newMember.nickname){
      console.log("hhh")
    const embed = new Discord.MessageEmbed()
    .setAuthor({ name: guild.user.tag, iconURL:guild.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`**:writing_hand: ${guild} roles has been updated.**`)
    .addFields(
      
      {
        name:'oldNickname',
        value:`${oldMember.nickname}`,
      },
      {
        name:'newNickname',
        value:`${newMember.nickname}`,}
      
      )
    .setTimestamp()
    .setFooter(newMember.guild.name,newMember.guild.iconURL({ dynamic: true }))
    return logChannel.send({ embeds: [embed] })
    }
    /*
    const newembed = new Discord.MessageEmbed()
    .setAuthor({name: newMember.guild.name, urlIcon: newMember.guild.iconURL({dynamic: true})})
  /*  if(oldMember){
newembed.addFields({ name: "oldRole", value:},
                { name:"newRole", value:})
      
    }
    logChannel.send({embeds:[newembed]})*/
  
  
  
  }}