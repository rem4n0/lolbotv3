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
app.get('/support',async(req,res,next)=>{
  const maintenance = await Maintenance.findOne({
  server: config.serverid
})

if(maintenance && maintenance.toggle == "true") {

     return res.render(res, req, "maintenance.ejs")
}


  res.redirect(config.support)
  
})
app.get('/commands',async(req,res,next)=>{
  const maintenance = await Maintenance.findOne({
  server: config.serverid
})

if(maintenance && maintenance.toggle == "true") {

     return res.render(res, req, "maintenance.ejs")

}


  res.render("commands",{
    user:req.isAuthenticated() ? req.user:null,
    req:req,
    bot:bot,
  })
})
app.get("/downtime", global.checkAuth,async (req,res)=>{
  let maintenc = await Maintenance.findOne({server: config.serverid})
  if(maintenc){
    res.render("maintenance",{
      user:req.isAuthenticated()? req.user:null,
      bot:bot,
      data: maintenc,
      config: config,
    })}else{
      res.redirect("/");}
})
app.get("/bans",async (req,res)=>{
  const maintenance = await Maintenance.findOne({
  server: config.serverid
})

if(maintenance && maintenance.toggle == "true") {

     return res.render(res, req, "maintenance.ejs")

}


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
