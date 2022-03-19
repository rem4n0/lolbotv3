const app = require("express").Router();
const path = require("path");
console.log("autorole router loaded");
app.get(
  "/dashboard/guild/:guildID/autorole",
  global.checkAuth,
  async (req, res, next) => {
    const guild = bot.guilds.cache.get(req.params.guildID);
    let data = await Guild.findOne({ guildID: guild.id });
  const user = guild.members.cache.get(req.user.id);
    if (!user.permissions.has("MANAGE_GUILD")) {
      res.redirect("?error=true&message= You can't access to this page");
    }
    res.render("./guild/autorole.ejs", {
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
  "/dashboard/guild/:guildID/autorole",
  global.checkAuth,
  async (req, res) => {
    const guild = bot.guilds.cache.get(req.params.guildID);
    let rbody = req.body;

   /* if (rbody["prefix"].length > 5) {
      return res.send({ error: true, message: "you can't add up 5 words" });
    }*/

    let data = await Guild.findOne({ guildID: guild.id });
/*
    await Guild.findOneAndUpdate(
      {
        guildID: req.params.guildID,
      },
      {
        $set: {
          "plugins.autorole.enabled": rbody["enabled"] || false,
          "plugins.autorole.role": rbody["role"],
        },
      }
    );*/
  if(rbody["enabled"] === "on"){ 
    data.plugins.autorole = {
      
    enabled: true,
      role: rbody["role"]
    
    
  }
    data.markModified("plugins.autorole");
    await data.save();
  }
    if(rbody["enbaled"] === "off"){
      
      data.plugins.autorole ={
        
        enabled: false,
        role: null,
      }
      data.markModified("plugins.autorole");
   await   data.save();
    }
   return res.send({ success: true, message: "successfully" });
  }
);

module.exports = app;
