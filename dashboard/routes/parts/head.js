const app = require("express").Router();
const path = require("path");

app.get(
    "/dashboard/:guildID",
    
    global.checkAuth,
    async (req, res) => {/*
      let guildcache = bot.guilds.cache.get(req.params.guildID);
      if (!guildcache.members.fetch(req.user.id)) {
        return res.redirect(
          "/error?code=404&message=You must be in our support server to perform this operation"
        );
      }
      if (!bot.guilds.cache.get(req.params.guildID)) {
        return res.redirect(
          "/error?code=404&message=You have to add an official bot to do this"
*/
      res.render("guild/setting.ejs", {
        req: req,
       path: req.path,
        user: req.isAuthenticated() ? req.user : null,
        config: global.config,
        guild: req.params.guildID,
      });
    }
  );



module.exports = app;
