const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  name:"autorole",
  description:"toggle autorole to off or on",
  options:[{
    
    
    StringChoices:{
      name:"toggle",
      description:"toggle Auto role to on off",
      required:true,
      choices:[
        ["disable","off"],
        ["enable","on"]
        
        ]},
    Role:{
      name:"role",
      description:"if on mention role",
      required:true,
    
    }
    
  }],
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  enabled:true,
  category:["admin"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {
    let status = await interaction.options.getString('toggle')
    let role = await interaction.options.getRole('role')


		if(status !== "on" && status !== "off"){
			return interaction.reply({content:`Please specify a valid value between **on** and **off**`})
		}
        
		if(status === "on"){

/*
			const role = await Resolvers.resolveRole({
			message,
				search: args.slice(1).join(" ")
			});*/
   ///  let role = await message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
			if(!role){
				return interaction.reply({content:`Please specify a valid role!`})
			}

			data.guild.plugins.autorole = {
				enabled: true,
				role: role.id
			};
			data.guild.markModified("plugins.autorole");
			await data.guild.save();

			interaction.reply({content:`Autorole enabled! New members will automatically receive the **${role.name}** role.`})
      
     const channelEmbed = await interaction.guild.channels.cache.get(data.guild.plugins.modlogs)

      if(!channelEmbed) return;
    const embed = new Discord.MessageEmbed()
    .setDescription(`:pencil: **Auto role enabled**`)
    .addField('Moderator Name', interaction.user.tag, true)
    .addField('Role Name',role.name, true)
    .setFooter({text:interaction.guild.name})
    .setThumbnail(interaction.guild.iconURL())
    .setTimestamp()
    .setColor(config.embed.Color)
  
   
   
        if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(interaction.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
            channelEmbed.send({embeds:[embed]}).catch((err)=>{console.log(err)})
          
            setTimeout(()=>{
            }, 3000)
 
      
      
		}}

		if(status === "off"){
      
			if(!data.guild.plugins.autorole.enabled){
				return interaction.reply({content:`**The autorole is already disabled.**`})
			}

			data.guild.plugins.autorole = {
				enabled: false,
				role: null
			};
			data.guild.markModified("plugins.autorole");
			await data.guild.save();
            
			interaction.reply({content:`
      
      The autorole is already disabled.**

      
      
`})
      
    const channelEmbed = await interaction.guild.channels.cache.get(data.guild.plugins.modlogs)

      if(!channelEmbed) return;
    const embed = new Discord.MessageEmbed()
    .setDescription(`:pencil: **Auto role disabled**`)
    .addField('Moderator Name', interaction.author.toString(), true)
    //.addField('Role Name',role.name, true)
    .setFooter({text:interaction.guild.name})
    .setThumbnail(interaction.guild.iconURL())
    .setTimestamp()
    .setColor(config.embed.Color)
  
   
   
        if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(interaction.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
            channelEmbed.send({embeds:[embed]}).catch((err)=>{console.log(err)})
          
            setTimeout(()=>{
            }, 3000)
      }}
    
    
  }}

    