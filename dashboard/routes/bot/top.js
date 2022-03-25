const app = require("express").Router();
const path = require("path");
const Discord = require("discord.js");
app.get("/dashboard/top", global.checkAuth, async (req, res, next) => {
     
    return User.find({}).exec(async (err, docs) => {
      docs = docs
        .map((x) => {
          return { xp: x.data.global_xp };
        })
        .sort((A, B) => B.global_xp - A.global_xp) // Arrange by points, descending.
   // Remove document where xp is 0.
   const a = bot.users.fetch({user:docs.slice(0,50).map(x => x.id)})
   
   
   
   
   
      res.render("./bot/top.ejs", {
        a:a,
        config: config,
        support: config.support,
      docs: docs,
      
        req: req,
        res: res,

        bot: bot,
        user: req.isAuthenticated() ? req.user : null,
      });
    });
  });
module.exports = app;
