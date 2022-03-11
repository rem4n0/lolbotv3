const app = require("express").Router();
const path = require("path");
console.log("setting router loaded");
app.get(
  "/dashboard/guild/:guildID/logsystem",
  global.checkAuth,
  async (req, res, next) => {
    const guild = bot.guilds.cache.get(req.params.guildID);
    let data = await Guild.findOne({ guildID: guild.id });
    res.render("./guild/logsystem.ejs", {
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
  "/dashboard/guild/:guildID/logsystem",
  global.checkAuth,
  async (req, res) => {
    const guild = bot.guilds.cache.get(req.params.guildID);
    let { logchannel, logon, roleCreate, roleDelete, channelDelete,channelCreate,roleUpdate } = req.body;

  /*  if (xpmessage.length > 200) {
      res.send({ error: true, message: " level message too long", });
    }*/
    
    let data = await Guild.findOne({ guildID: guild.id });

    await Guild.findOneAndUpdate(
      {
        guildID: req.params.guildID,
      },
      {
        $set: {
          "plugins.logs.logchannel": logchannel || null,
          "plugins.logs.on": logon,
          "plugins.logs.roleCreate": roleCreate,
          "plugins.logs.roleDelete": roleDelete,
          "plugins.logs.roleUpdate": roleUpdate,
          "plugins.logs.channelCreate":channelCreate,
          "plugins.logs.channelDelete":channelDelete,

        },
      }
    );

    return res.send({ success: true, message: "successfully" });
  }
);
module.exports = app;
