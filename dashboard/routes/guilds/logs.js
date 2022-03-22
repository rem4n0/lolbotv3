const app = require("express").Router();
const path = require("path");
console.log("setting router loaded");
app.get(
  "/dashboard/guild/:guildID/logsystem",
  global.checkAuth,
  async (req, res, next) => {
    const guild = bot.guilds.cache.get(req.params.guildID);
    let user = guild.members.cache.get(req.user.id);
    if(!user.permissions.has("MANAGE_GUILD")){ res.send(`YOU CAN'T ACCESS`)}
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
    let rbody = req.body;

    
    let data = await Guild.findOne({ guildID: guild.id });

    await Guild.findOneAndUpdate(
      {
        guildID: req.params.guildID,
      },
      {
        $set: {
          "plugins.logs.channel": rbody["logchannel"],
          "plugins.logs.enabled": Boolean(rbody["onoff"]) || true,
          

        },
      }
    );

      
      
      
    

    return res.send({ success: true, message: "successfully" });
  }
);
module.exports = app;
