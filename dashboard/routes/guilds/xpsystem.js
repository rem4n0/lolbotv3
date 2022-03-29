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
  let r = rbody["onoff"]=== "true";
    console.log(r);
   if (Object.prototype.hasOwnProperty.call(rbody, "channel")) {
    
        await Guild.findOneAndUpdate(
          { guildID: req.params.guildID },
          {
            $set: {
              "xp.channel": rbody["channel"],
              "xp.message": rbody["xpmessage"],
              "xp.max": rbody["max"],
              "xp.min": rbody["min"],
            },
          }
        );
return res.send({ success:true, message:"successfully"});
      }
  
    let data = await Guild.findOne({ guildID: req.params.guildID });

    await Guild.findOneAndUpdate(
      {
        guildID: req.params.guildID,
      },
      {
        $set: {
          "xp.onoff": rbody["onoff"] ==="true",
        },
      }
    );

    //return res.send({ success: true, message: "successfully" });
  }
);
module.exports = app;
