const app = require("express").Router();
const path = require("path");
const Discord = require("discord.js");
app.get("/top/xp", global.checkAuth, async (req, res, next) => {
     
    return User.find({}).exec(async (err, docs) => {
      docs = docs
        .map((x) => {
          return { id: x.userID, data:x.data.global_xp, level:x.data.global_level };
        })
        .sort((A, B) => B.data.global_xp - A.data.global_xp) // Arrange by points, descending.
   // Remove document where xp is 0.
   const users = await bot.users.fetch({ user: docs.slice(0,10).map(x => x.id) })
      .catch(() => null)
   
   
   
   
   
      res.render("./bot/topxp.ejs", {
        users:users,
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
