const app = require("express").Router();
const path = require("path");
const { createCanvas, loadImage } = require("canvas");
const market = require (`${process.cwd()}/shop/market.json`);
console.log("profile router loaded");
const _ = require('lodash');








app.get(
  "/profile/:userID",
  global.checkAuth,
  async (req, res, next) => {
    const maintenance = await Maintenance.findOne({
  server: config.serverid
})
const status = bot.guilds.fetch();
    console.log(status)
if(maintenance && maintenance.toggle == "true") {

     return res.render(res, req, "maintenance.ejs")

}


    const user = bot.users.fetch(req.params.userID).then(async (a)=>{
    if(!a) res.redirect("/");
  let data = await User.findOne({userID: a.id});
    
      res.render("./users/profile.ejs", {
        config: config,
        data:data,
  
        req: req,
        bot: bot,
      _:_,
        market:market,
        member:a,
        user: req.isAuthenticated() ? req.user : null,
      })
    })});
module.exports = app;
