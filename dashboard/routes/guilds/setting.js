const app = require("express").Router();
const path = require("path");
console.log("setting router loaded");
app.get(
  "/dashboard/guild/:guildID/setting",
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
      res.redirect("?error=true&message= You can't access to this page");
    }
    res.render("./guild/setting.ejs", {
      config: config,
      data: data,
      req: req,
      bot: bot,
      guild: guild,
      user: req.isAuthenticated() ? req.user : null,
    });
  }
);
app.get('/', async (res,req)=>{
  res.render("./index.ejs")
  
})

app.post(
  "/dashboard/guild/:guildID/setting",
  global.checkAuth,
  async (req, res) => {
    const guild = await bot.guilds.cache.get(req.params.guildID);
    let rbody = req.body;

    if (rbody["prefix"].length > 5) {
      return res.send({ error: true, message: "you can't add up 5 words" });
    }
if(!rbody["prefix"]){ res.send({error:true, message:" Prefix field empty"})
                     
                     
                    }else{
    
    let data = await Guild.findOne({ guildID: guild.id });

    await Guild.findOneAndUpdate(
      {
        guildID: req.params.guildID,
      },
      {
        $set: {
          prefix: rbody["prefix"],
        },
      }
    );

   return res.send({ success: true, message: "successfully" });
  }}
);

module.exports = app;
