const app = require('express').Router();
const { Permissions } = require('discord.js');


///const channels = global.config.server.channels;
const Discord = require("discord.js")
console.log(" guild router loaded.");


const flags = [
	Permissions.FLAGS.MANAGE_GUILD
	
];
app.get("/dashboard/guild", global.checkAuth, async (req,res) => {
  const member = bot.users.fetch(req.user.id).then(async (a)=>{
  
  
  
  
  
    res.render("guild/guilds.ejs", {
        bot: bot,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,
      flag:flags,
      res:res,
      member:a,
        perms: Discord.Permissions,
        guildID: req.params.guildID,

	})
  
})
  })
module.exports = app;
