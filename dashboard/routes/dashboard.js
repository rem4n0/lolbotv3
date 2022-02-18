const app = require("express").Router();
const path = require("path");

app.get("/dashboard",(req, res,next)=> {
  //let data = await Guild.findOne({guildID:req.
  res.render("dashboard.ejs", {
    config: config,
    support:config.support,
    
    bot: bot,
    user:req.isAuthenticated() ? req.user : null,
  });
}); 
module.exports = app;
