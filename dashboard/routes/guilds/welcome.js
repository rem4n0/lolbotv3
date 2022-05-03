const app = require("express").Router();
const path = require("path");
console.log("welcome router loaded");
app.get(
  "/dashboard/guild/:guildID/welcome",
  global.checkAuth,
  async (req, res, next) => {
    const maintenance = await Maintenance.findOne({
      server: config.serverid,
    });

    if (maintenance && maintenance.toggle == "true") {
      return res.render(res, req, "maintenance.ejs");
    }

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
  async (req, res) => {
    const guild = bot.guilds.cache.get(req.params.guildID);
    let rbody = req.body;
    let h = rbody["goodbyeonoff"] === "true";
    console.log(h);
    let data = await Guild.findOne({ guildID: guild.id });
    if (!data) return;
    if(rbody["goodbyeonoff"] === "true"){
    if (Object.prototype.hasOwnProperty.call(rbody, "channel")) {
    /*  if (!rbody["message"])
        return res.send({
          error: true,
          message: "Fill the must be blank ",
        });*/
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },

        {
          $set: {
            "plugins.goodbye.message": rbody["message"],
            "plugins.goodbye.channel": rbody["channel"],
          },
        }
      );
      if(String(!rbody["message"])){ await Guild.findOneAndUpdate({guildID: req.params.guildID},{$set:{"plugins.goodbye.message":null}},{upsert:true})}
      res.send({ success: true, message: "successfully" });
    }}
    if (rbody["goodbyeonoff"] === "false") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        {
          $set: {
            "plugins.goodbye.enabled": false,
            "plugins.goodbye.withImage": null,
            "plugins.goodbye. message": null,
            "plugins.goodbye.channel": null,
          },
        },
        { upsert: true }
      );
    }
    if (rbody["goodbyeonoff"] === "true") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        {
          $set: {
            "plugins.goodbye.enabled": rbody["goodbyeonoff"] === "true",
            "plugins.goodbye.withImage": rbody["withImg"] === "true",
          },
        },
        { upsert: true }
      );
    }
  }
);
app.post(
  "/dashboard/guild/:guildID/welcome",
  global.checkAuth,
  async (req, res) => {
    const guild = bot.guilds.cache.get(req.params.guildID);
    let rbody = req.body;
    let h = rbody["onoff"] === "true";
    console.log(h);
  
    let data = await Guild.findOne({ guildID: guild.id });
if(rbody["onoff"] === "true"){
    if (Object.prototype.hasOwnProperty.call(rbody, "channel")) {
    
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        {
          $set: {
            "plugins.welcome.message": rbody["message"],

            "plugins.welcome.channel": rbody["channel"],
          },
        }
      );
      if(String(!rbody["message"])){ await Guild.findOneAndUpdate({guildID: req.params.guildID},{ $set:{ "plugins.welcome.message":null}},{upsert:true})}

      res.send({ success: true, message: "successfully" });
    }}

    if (rbody["onoff"] === "false") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        {
          $set: {
            "plugins.welcome.enabled": false,
            "plugins.welcome.message": null,
            "plugins.welcome.withImage": null,
            "plugins.welcome.channel": null,
          },
        },
        { upsert: true }
      );
    }
    if (rbody["onoff"] === "true") {
      await Guild.findOneAndUpdate(
        { guildID: req.params.guildID },
        {
          $set: {
            "plugins.welcome.enabled": rbody["onoff"] === "true",
            "plugins.welcome.withImage": rbody["withImg"] === "true",
          },
        },
        { upsert: true }
      );
    }
    
  }
);

module.exports = app;
