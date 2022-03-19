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

   

    let data = await Guild.findOne({ guildID: guild.id });
    
    
    if(Object.prototype.hasOwnProperty.call(rbody, "autoroleDisable")){

      const autorole ={
        enabled:false,
        role:null,
      }
      data.plugins.autorole =autorole;
		data.markModified("plugins.autorole");
		await data.save();
      return res.send({success: true, message: "successfully"});
      
    }
    if(Object.prototype.hasOwnProperty.call(rbody, "autoroleEnable") || Object.prototype.hasOwnProperty.call(rbody, "autoroleUpdate")){
const autorole = {
  enable: true,
  role: guild.roles.cache.find((r) => "@"+r.name === rbody.role).id
		
      
}
data.plugins.autorole = autorole;
      data.markModified("plugins.autorole")
      await data.save();
    return res.send({ success: true, message:" Successfully"});

      
    }
  /// return res.send({ success: true, message: "successfully" });
  }
);

module.exports = app;
