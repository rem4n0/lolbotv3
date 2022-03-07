const app = require("express").Router();
const path = require("path");
console.log("setting router loaded");
app.get(
  "/profile/:userID",
  global.checkAuth,
  async (req, res, next) => {
    const user = bot.users.cache.get(req.params.userID)
  let data = await User.findOne({userID: user.id});
      res.render("./user/user.ejs", {
        config: config,
        data:data,
        req: req,
        bot: bot,
        user: req.isAuthenticated() ? req.user : null,
      })
    });
module.exports = app;
