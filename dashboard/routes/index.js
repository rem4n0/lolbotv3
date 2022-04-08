const app = require("express").Router();
const path = require("path");
const type = require ('typed.js')
app.get("/",(req, res,next)=> {
  
  const hama = bot.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0) 
  //let data = await Guild.findOne({guildID:req.
  res.render("index.ejs", {
    config: config,
    support:config.support,
    req: req,
 guild:hama,
    Typed: type,
    bot: bot,
    user:req.isAuthenticated() ? req.user : null,
  });
}); 
app.get('/support',(req,res,next)=>{
  res.redirect(config.support)
  
})
app.get('/commands',(req,res,next)=>{
  res.render("commands",{
    user:req.isAuthenticated() ? req.user:null,
    req:req,
    bot:bot,
  })
})
app.get("downtime", global.checkAuth,async (req,res)=>{
  let maintenc = await Maintenance.fin
})
app.get("/bans",async (req,res)=>{
  res.render("bans",{
  // data:data,
    bot:bot,
    req:req,
    user: req.isAuthenticated() ? req.user:null,
  })})
app.get('/invite',(req,res,next)=>{
  
  res.redirect(config.invitelink)
  
})
module.exports = app;
