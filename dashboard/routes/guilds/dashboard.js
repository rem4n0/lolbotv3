const app = require("express").Router();
const path = require("path");
const Discord = require ("discord.js")
app.get("/dashboard/guild/:guildID",global.checkAuth,async(req, res,next)=> {
  
  const user = bot.guilds.fetch(req.params.guildID).then(async(a)=>{
  let data = await Guild.findOne({guildID:a.id});
  
  res.render("./guild/dashboard.ejs", {
    config: config,
    support:config.support,
    data:data,
    res:res,
    guildID: req.params.guildID,
    bot: bot,
    user:req.isAuthenticated() ? req.user : null,
  })});
}); 
module.exports = app;
