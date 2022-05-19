
const player = require("../../handler/player");
const Discord = require ("discord.js");
module.exports = {

name:"skip",
  description:"skip to another songs",

  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["music"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {
    if(!interaction.member.voice.channel){ return interaction.reply({content:`You can't skip songs`})}

    const queue = player.getQueue(interaction.guildId);
    if (!queue?.playing)
      return interaction.reply({content:` Thers is no music currently beign played`
      });
const current = queue.current;
    queue.skip();

    const Skipped = new Discord.MessageEmbed()
      .setColor(config.embed.Color)
      .setTitle("Skipping")
      .setDescription(`I've successfully skipped the ${current}, next song it is!`)
      .setTimestamp()
      .setFooter("Requested by " + interaction.member.user.tag);

    interaction.reply({ embeds: [Skipped] });}}