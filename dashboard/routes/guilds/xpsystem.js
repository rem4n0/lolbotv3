const app = require("express").Router();
const path = require("path");
console.log("settingrouter loaded");
app.get(
  "/dashboard/guild/:guildID/xpsystem",
  global.checkAuth,
  async (req, res, next) => {
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
    if (Object.prototype.hasOwnProperty.call(rbody, "onoff")) {
      if (rbody["message"].length > 200) {
        res.send({ error: true, message: " level message too long" });
      }
      if (rbody["max"] > 10) {
        return res.send({
          error: true,
          message: " maximum of xp point should less than 10",
        });
      }
      if (rbody["min"] > 5) {
        return res.send({
          error: true,
          message: " minimum xp points should less than 5",
        });
        await Guild.findOneAndUpdate(
          { guildID: guild.id },
          {
            $set: {
              "xp.channel": rbody["channel"],
              "xp.message": rbody["message"],
              "xp.max": rbody["max"],
              "xp.min": rbody["min"],
            },
          }
        );
      }
    }
    let data = await Guild.findOne({ guildID: guild.id });

    await Guild.findOneAndUpdate(
      {
        guildID: guild.id,
      },
      {
        $set: {
          "xp.onoff": rbody["onoff"] ==="true",
        },
      }
    );

    return res.send({ success: true, message: "successfully" });
  }
);
module.exports = app;
