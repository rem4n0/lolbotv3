const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  
  name:"unban",
  description:"unban users if banned",
  options:[{
    
    Integer:{
      name:"id",
      description:"put id of user",
      required:true,
      
      
    }
  }],
  enabled: true,			    
  memberPermissions: [ "SEND_MESSAGES","BAN_MEMBERS" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS","BAN_MEMBERS" ],		
  enabled:true,
  category:["admin"],
  ownerOnly: false,			
  cooldown: 10000,
prime: false,
  run: async (interaction,bot,data) => {

    
    let user = await interaction.options.getNumber("id")
let ban = await interaction.guild.bans.fetch(user).catch(()=>{return 
               interaction.reply({content:`<This user not found>`})
              });
      if(ban){
        interaction.guild.members.unban(user).catch(()=>{return interaction.reply({content:`User not found`})})
             return interaction.reply({content:`User unbanned`})                                     
                           
        
      }else{
        return interaction.reply({content:`User not found`})
      
    // return interaction.reply({content:`Unbanned this user`})
                                      
      }
  
      }

  }