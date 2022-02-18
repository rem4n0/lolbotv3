const app = require("express").Router();
const path = require("path");

app.get("/dashboard/:userid",async(req, res,next)=> {
  //const user = bot.users.fetch(req.user.user)
  let data = await User.findOne({userID:req.params.userid})
  res.render("dashboard.ejs", {
    config: config,
    support:config.support,
    data:data,
    bot: bot,
    user:req.isAuthenticated() ? req.user : null,
  });
}); 
module.exports = app;
