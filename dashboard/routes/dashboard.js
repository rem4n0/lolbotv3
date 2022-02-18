const app = require("express").Router();
const path = require("path");

app.get("/dashboard",async(req, res,next)=> {
  //onst user = bot.users.fetch(req.user.user)

  res.render("dashboard.ejs", {
    config: config,
    support:config.support,

    bot: bot,
    user:req.isAuthenticated() ? req.user : null,
  });
}); 
module.exports = app;
