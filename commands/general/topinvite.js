  const Discord = require("discord.js");


module.exports = {
  name: "topinvites",
  aliases: ["topinvite"],
  description: "",
  usage: [""],
  category: [""],
  enabled: true,
  memberPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  ownerOnly: false,
  cooldown: 6000,
  run: async (bot, message, args, dev, data) => {



var invites = await message.guild.invites.fetch()
    
   // invites = invites.values();
    invites, "uses", { reverse: true };
    console.log(invites)
    let possibleInvites = ["User Invited |  Uses "];
    invites.forEach(i => {
      console.log(i);
      if (i.uses === 0) {
        return;
      }
      possibleInvites.push([
        "\n " +  i.inviter.username + "  :  " + i.uses
      ]);
    });
    let embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .addField("Top Invites.", `${possibleInvites}`);

    message.channel.send({embeds:[embed]})}}