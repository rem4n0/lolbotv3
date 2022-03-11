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
          "logs.logchannel": logchannel,
          "logs.on": logon,
          "logs.roleCreate": roleCreate,
          "logs.roleDelete": roleDelete,
          "logs.roleUpdate": roleUpdate,
          "logs.channelCreate":channelCreate,
          "logs.channelDelete":channelDelete,

        },
      }
    );
    if(roleCreate === "true"){
      await Guild.UpdateOne({
        guildID: req.params.guildID},
                            
                            {
        $set:{
          
          "logs.logchannel": 
                            
                            
      
      
      
    }

    return res.send({ success: true, message: "successfully" });
  }
);
module.exports = app;
