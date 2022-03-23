const app = require("express").Router();
const path = require("path");
console.log("welcome router loaded");
app.get(
  "/dashboard/guild/:guildID/welcome",
  global.checkAuth,
  async (req, res, next) => {
    const guild = bot.guilds.cache.get(req.params.guildID);
    let data = await Guild.findOne({ guildID: guild.id });
    const user = guild.members.cache.get(req.user.id);
    if (!user.permissions.has("MANAGE_GUILD")) {
      res.redirect("?error=true&message= You can't access to this page");
    }
    res.render("./guild/welcomesystem.ejs", {
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
  "/dashboard/guild/:guildID/goodbye",
  global.checkAuth,
  async (req,rws) => {
    const guild =bot.guilds.cache.get(req.params.guildID)
    let rbody = req.body;
    let data = await Guild.findOne({ guildID: guild.id});
    if (Object.prototype.hasOwnProperty.call(rbody, "goodbyechannel")) {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },

        {
          $set: {
            "plugins.goodbye.message": rbody["goodbyemessage"],
            "plugins.goodbye.channel": rbody["goodbyechannel"],
            "plugins.goodbye.withImage": false,
          },
        }
      );
      res.send({ success: true, message: "successfully" });
    }
    await Guild.findOneAndUpdate(
      { guildID: req.params.guildID },
      { $set: { "plugins.goodbye.enabled": rbody["goodbyeonoff"] === "true" } }
    );
  }
);

app.post(
  "/dashboard/guild/:guildID/welcome",
  global.checkAuth,
  async (req, res) => {
    const guild = bot.guilds.cache.get(req.params.guildID);
    let rbody = req.body;

    let data = await Guild.findOne({ guildID: guild.id });
    if (!rbody["channel"]) {
      return res.send({
        error: true,
        message: " Something went worng like channel",
      });
    }

    if (Object.prototype.hasOwnProperty.call(rbody, "channel")) {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        {
          $set: {
            "plugins.welcome.message": rbody["welcomemessage"],
            "plugins.welcome.withImage": true,
            "plugins.welcome.channel": rbody["channel"],
          },
        }
      );

      res.send({ success: true, message: "successfully" });
    }

    await Guild.findOneAndUpdate(
      { guildID: req.params.guildID },
      {
        $set: {
          "plugins.welcome.enabled": rbody["onoff"] === "true",
        },
      }
    );
  }
);

module.exports = app;
