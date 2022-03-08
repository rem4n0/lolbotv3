const app = require("express").Router();
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

console.log("profile router loaded");

app.get(
  "/profile/:userID",
  global.checkAuth,
  async (req, res, next) => {
    
    const user = bot.users.fetch(req.params.userID).then(async (a)=>{
  let data = await User.findOne({userID: a.id});
    a.guilds.forEach(guild=>{
    
      res.render("./users/profile.ejs", {
        config: config,
        data:data,
        hama:hama,
        req: req,
        bot: bot,
        guild:guild,
        member:a,
        user: req.isAuthenticated() ? req.user : null,
      })
    })});})
module.exports = app;
