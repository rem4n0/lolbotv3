const app = require("express").Router();
const path = require("path");
const type = require ('typed.js')
app.get("/dashboard/:guildID/leaderboard",(req, res,next)=> {
  
  const guild = bot.guilds.cache.get(req.params.guildID);
  res.render("./guild/leaderboard.ejs", {
    config: config,
    
    req: req,
 guild:guild,
    
    bot: bot,
    user:req.isAuthenticated() ? req.user : null,
  });
}); 


module.exports = app;
