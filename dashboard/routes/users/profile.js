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
      res.render("./users/profile.ejs", {
        config: config,
        data:data,
        req: req,
        bot: bot,
        loadImage:loadImage,
        createCanvas:createCanvas, 
        member:a,
        user: req.isAuthenticated() ? req.user : null,
      })
    })});
module.exports = app;
