const app = require("express").Router();
const path = require("path");
const Discord = require("discord.js");
app.get("/daily", global.checkAuth, async (req, res, next) => {
  const user = bot.users.fetch(req.user.id).then(async (a) => {
    let data =
      (await User.findOne({ userID: a.id })) ||
      (await new User({ userID: a.id }));

    if (!user) {
      res.redirect(
        `/error?code=404&message= I can't fetch you, you must be a user of bot then try again`
      );
    }
    res.render("./users/daily.ejs", {
      config: config,
      support: config.support,
      data: data,

      req:req,
      res: res,
    
      bot: bot,
      user: req.isAuthenticated() ? req.user : null,
    });
  });
});
module.exports = app;
