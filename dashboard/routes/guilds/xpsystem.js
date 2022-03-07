const app = require("express").Router();
const path = require("path");
console.log("setting router loaded");
app.get(
  "/dashboard/guild/:guildID/xpsystem",
  global.checkAuth,
  async (req, res, next) => {
    const guild = bot.guilds.cache.get(req.params.guildID);
    let data = await Guild.findOne({ guildID: guild.id });
    res.render("./guild/xpsystem.ejs", {
      config: config,
      data: data,
      req: req,
      bot: bot,
      guild: guild,
      user: req.isAuthenticated() ? req.user : null,
    });
  }
);

app.post(
  "/dashboard/guild/:guildID/xpsystem",
  global.checkAuth,
  async (req, res) => {
    const guild = bot.guilds.cache.get(req.params.guildID);
    let { xpchannel, xpmax, xpmin, xpmessage } = req.body;

    if (xpmessage.length > 200) {
      res.send({ error: true, message: " level message too long" });
    }
    if (xpmax > 10) {
      return res.send({
        error: true,
        message: " maximum of xp point should less than 10",
      });
    }
    if (xpmin > 5) {
      return res.send({
        error: true,
        message: " minimum xp points should less than 5",
      });
    }
    let data = await Guild.findOne({ guildID: guild.id });

    await Guild.findOneAndUpdate(
      {
        guildID: req.params.guildID,
      },
      {
        $set: {
          "channels.xp": xpchannel || null,
          "xp.max": xpmax,
          "xp.min": xpmin,
          "xp.message": xpmessage,
        },
      }
    );

    return res.send({ success: true, message: "successfully" });
  }
);
module.exports = app;
