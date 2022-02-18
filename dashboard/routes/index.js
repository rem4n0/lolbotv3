const app = require("express").Router();
const path = require("path");

app.get("/",(req, res,next)=> {
  //let data = await Guild.findOne({guildID:req.
  res.render("index.ejs", {
    bot: bot,
    user:req.isAuthenticated() ? req.user : null,
  });
}); 
module.exports = app;
