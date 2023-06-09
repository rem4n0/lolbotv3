const app = require("express").Router();
const path = require("path");
console.log("setting router loaded");
app.get(
  "/dashboard/guild/:guildID/logsystem",
  global.checkAuth,
  async (req, res, next) => {
    const maintenance = await Maintenance.findOne({
      server: config.serverid,
    });

    if (maintenance && maintenance.toggle == "true") {
      return res.render(res, req, "maintenance.ejs");
    }

    const guild = await bot.guilds.cache.get(req.params.guildID);
    const user = await guild.members.fetch(req.user.id);
    if (!user.permissions.has("MANAGE_GUILD")) {
      res.send(`YOU CAN'T ACCESS`);
    }
    let data = await Guild.findOne({ guildID: guild.id })|| new Guild({guildID: guild.id}).save();
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
    const guild = await bot.guilds.cache.get(req.params.guildID);
    let rbody = req.body;

    let data = await Guild.findOne({ guildID: guild.id });

    if (Object.prototype.hasOwnProperty.call(rbody, "channelCreatechannel" || "channelDeletechannel"||"channelUpdatechannel")) {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        {
          $set: {
            "plugins.logs.channelCreate.channel":
              rbody["channelCreatechannel"],
            "plugins.logs.channelCreate.color":
              rbody["channelCreatecolor"],
            "plugins.logs.channelDelete.channel":
              rbody["channelDeletechannel"],
            "plugins.logs.channelDelete.color":
              rbody["channelDeletecolor"],
            "plugins.logs.channelUpdate.channel":
              rbody["channelUpdatechannel"],
            "plugins.logs.channelUpdate.color":
              rbody["channelUpdatecolor"],
            "plugins.logs.roleCreate.channel":
              rbody["roleCreatechannel"],
            "plugins.logs.roleCreate.color": rbody["roleCreatecolor"],
            "plugins.logs.roleDelete.channel":
              rbody["roleDeletechannel"],
            "plugins.logs.roleDelete.color": rbody["roleDeletecolor"],
            "plugins.logs.roleUpdate.channel":
              rbody["roleUpdatechannel"],
            "plugins.logs.roleUpdate.color": rbody["roleUpdatecolor"],
          },
        },
        { upsert: true }
      );
      console.log("hama")
      res.send({ success: true, message: " successfully" });
    }
if(rbody["onoff"] === "true"){ await Guild.findOneAndUpdate({guildID: req.params.guildID},{$set:{"plugins.logs.enabled":true}},{ upsert: true})
                             }
    if(rbody["onoff"]=== "false"){ await Guild.findOneAndUpdate({ guildID: req.params.guildID},{ $set:{ "plugins.logs.enabled": false}},{ upsert: true})}
    
    if (rbody["channelCreateonoff"] === "true") {
      console.log("true");
    } else {
      console.log("false");
    }
    if (rbody["channelCreateonoff"] === "true") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.channelCreate.enabled": true } },
        { upsert: true }
      );
    }
    if (rbody["channelCreateonoff"] === "false") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.channelCreate.enabled": false } },
        { upsert: true }
      );
    }
    if (rbody["channelDeleteonoff"] === "true") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.channelDelete.enabled": true } },
        { upsert: true }
      );
    }
    if (rbody["channelDeleteonoff"] === "false") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.channelDelete.enabled": false } },
        { upsert: true }
      );
    }
    if (rbody["channelUpdateonoff"] === "true") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.channelUpdate.enabled": true } },
        { upsert: true }
      );
    }

    if (rbody["channelUpdateonoff"] === "false") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.channelUpdate.enabled": false } },
        { upsert: true }
      );
    }
    if (rbody["roleCreateonoff"] === "true") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.roleCreate.enabled": true } },
        { upsert: true }
      );
    }
    if (rbody["roleCreateonoff"] === "false") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.roleCreate.enabled": false } },
        { upsert: true }
      );
    }
    if (rbody["roleDeleteonoff"] === "true") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.roleDelete.enabled": true } },
        { upsert: true }
      );
    }
    if (rbody["roleDeleteonoff"] === "false") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.roleDelete.enabled": false } },
        { upsert: true }
      );
    }
    if (rbody["roleUpdateonoff"] === "true") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.roleUpdate.enabled": true } },
        { upsert: true }
      );
    }
    if (rbody["roleUpdateonoff"] === "false") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        { $set: { "plugins.logs.roleUpdate.enabled": false } },
        { upsert: true }
      );

    }
  }
);
module.exports = app;
