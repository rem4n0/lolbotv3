const app = require("express").Router();
const path = require("path");
console.log("setting  router loaded");
app.get(
  "/dashboard/guild/:guildID/xpsystem",
  global.checkAuth,
  async (req, res, next) => {
    const maintenance = await Maintenance.findOne({
      server: config.serverid,
    });

    if (maintenance && maintenance.toggle == "true") {
      return res.render(res, req, "maintenance.ejs");
    }

    const guild = bot.guilds.cache.get(req.params.guildID);
    let user = guild.members.cache.get(req.user.id);
    if (!user.permissions.has("MANAGE_GUILD")) {
      res.send(`YOU CAN'T ACCESS`);
    }
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
    let rbody = req.body;

    if (Object.prototype.hasOwnProperty.call(rbody, "channel")) {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        {
          $set: {
            "xp.channel": rbody["channel"],
            "xp.message": rbody["message"] || null,
        }
        },
        { upsert: true }
      );
      return res.send({ success: true, message: "successfully" });
    }
    if (!rbody["onofff"] === "false") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "xp.channel": null, "xp.message": null } },
        { upsert: true }
      );
    }
    if (rbody["onoff"] === "true") {
      await Guild.findOneAndUpdate(
        {
          guildID: req.params.guildID,
        },
        {
          $set: {
            "xp.onoff": rbody["onoff"] === "true",
          },
        },
        { upsert: true }
      );
    }
    //return res.send({ success: true, message: "successfully" });
  }
);
module.exports = app;
