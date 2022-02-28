const app = require('express').Router();
const Permissions  = require('discord.js');


///const channels = global.config.server.channels;
const Discord = require("discord.js")
console.log(" guild router loaded.");



app.get("/dashboard/guilds", global.checkAuth, async (req,res) => {
  
  
  /*
  
  req.user.guilds.forEach((guild)=>{
    
    const perm = new Permissions(guild.permissoins)
    
       if(!perm.has('MANAGE_GUILD')){
        
        return
       }
                          
                          
                          
                          })*/
  
  
  
  
    res.render("main/guilds.ejs", {
        bot: bot,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
        perms: Discord.Permissions,
        guildID: req.params.guildID,

	})
  
})

module.exports = app;
