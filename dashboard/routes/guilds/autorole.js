const app = require("express").Router();
const path = require("path");
console.log("autorole router loaded");
app.get(
  "/dashboard/guild/:guildID/autorole",
  global.checkAuth,
  async (req, res, next) => {
    
    const maintenance = await Maintenance.findOne({
  server: config.serverid
})

if(maintenance && maintenance.toggle == "true") {

     return res.render(res, req, "maintenance.ejs")

}


    
    const guild = await bot.guilds.cache.get(req.params.guildID);
    let data = await Guild.findOne({ guildID: guild.id });
    const user = await guild.members.fetch(req.user.id);
    if (!user.permissions.has("MANAGE_GUILD")) {
      res.send("You can't access to this page");
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
    const guild = await bot.guilds.cache.get(req.params.guildID);
    let rbody = req.body;
    let data = await Guild.findOne({ guildID: guild.id });
let h = rbody["onoff"] === "true";
    console.log(h)
    
     if(Object.prototype.hasOwnProperty.call(rbody, "role")){
await Guild.findOneAndUpdate({ guildID: req.params.guildID}
                             ,{ $set:{
                               "plugins.autorole.role": rbody["role"],
                              /// "plugins.autorole.enabled": true,
                             }})
     
     res.send({ success: true, message:"successfully"})
     }
       
     

    await Guild.findOneAndUpdate(
      { guildID: req.params.guildID },
      {
        $set: {
     "plugins.autorole.enabled": rbody["onoff"] === "true",
  
        },
      }
    );

  }
);

module.exports = app;
