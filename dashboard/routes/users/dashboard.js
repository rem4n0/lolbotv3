const app = require("express").Router();
const path = require("path");
const Discord = require("discord.js");
app.get("/dashboard", global.checkAuth, async (req, res, next) => {
  const user = bot.users.fetch(req.user.id).then(async (a) => {
  /*  let data =
      (await User.findOne({ userID: a.id })) ||
      (await new User({ userID: a.id }));*/

  return User.find({}).exec( async (err, docs) => {

    
    docs = docs.map(x => { return {xp: x.data.global_xp };})
      .sort((A,B) => B.data.global_xp - A.data.global_xp) // Arrange by points, descending.
      .filter(x => x.global_xp); // Remove document where xp is 0.

    
    res.render("./users/dashboard.ejs", {
      config: config,
      support: config.support,
      data: docs,
    top: top,
      req:req,
      res: res,
  
      bot: bot,
      user: req.isAuthenticated() ? req.user : null,
    });
  });
});})
module.exports = app;
