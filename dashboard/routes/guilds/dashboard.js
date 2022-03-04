const app = require("express").Router();
const path = require("path");
const Discord = require("discord.js");
app.get(
  "/dashboard/guild/:guildID",
  global.checkAuth,
  async (req, res, next) => {
    const guild = bot.guilds.fetch(req.params.guildID).then(async (a) => {
      let data = await Guild.findOne({ guildID: a.id });

      const join1 = [];
      const leave1 = [];
      const join2 = [];
      const leave2 = [];

      a.members.cache.forEach(async (user) => {
        let day = 7 * 86400000;
        let x = Date.now() - user.joinedAt;
        let created = Math.floor(x / 86400000);

        if (7 > created) {
          join2.push(user.id);
        }
        if (1 > created) {
          join1.push(user.id);
        }
      });

      res.render("./guild/dashboard.ejs", {
        config: config,

        join1: join1.length || 0,
        join2: join2.length || 0,
        leave1: leave1.length || 0,
        guild:a,
        leave2: leave2.length || 0,

        support: config.support,
        data: data,
        res: res,
        guildID: req.params.guildID,
        bot: bot,
        user: req.isAuthenticated() ? req.user : null,
      });
    });
  }
);
module.exports = app;
