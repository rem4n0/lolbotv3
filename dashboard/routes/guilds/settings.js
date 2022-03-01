const app = require("express").Router();
const path = require("path");

app.get("/dashboard/guild/:guildID",global.checkAuth,async(req, res,next)=> {
  
  let data = await Guild.findOne({guildID: req.params.guildID})
  
  res.render("/main/setting.ejs", {
    config: config,
    support:config.support,
    data:data,

    bot: bot,
    user:req.isAuthenticated() ? req.user : null,
  })});
}); 
module.exports = app;
