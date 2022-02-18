const app = require("express").Router();
const path = require("path");

app.get("/dashboard",global.checkAuth,async(req, res,next)=> {
  
  const user = bot.users.fetch(req.user.id).then(async(a)=>{
  let data = await User.findOne({userID:a.id})

  res.render("dashboard.ejs", {
    config: config,
    support:config.support,
    data:data,

    bot: bot,
    user:req.isAuthenticated() ? req.user : null,
  })});
}); 
module.exports = app;
