/*const app = require("express").Router();
const path = require("path");

app.get("/dashboard/guild/:guildID/setting",global.checkAuth,async(req, res,next)=> {
  
  let data = await Guild.findOne({guildID: req.params.guildID})
  const guild = bot.guilds.cache.get(req.params.guildID);
  res.render("./guild/setting.ejs", {
    config: config,
    support:config.support,
    data:data,
    req:req,
    bot: bot,
    guild:guild,
    user:req.isAuthenticated() ? req.user : null,
  })});


app.post("/dashboard/guild/:guildID/setting", global.checkAuth, async (req,res) => {
  
      let rbody = req.body;
let data = await Guild.findOne({guildID: req.params.guildID})
if ((rbody['prefix']).length > 5) return res.redirect("?error=true&message=You cant add up 5 words to prefix..")
if(data){
  
  data.prefix= rbody["prefix"];
  data.xp.onoff= rbody["xp"];
  data.channels.xp= rbody["xpchannel"]
  
}
data.save();
res.redirect(`?success=true&message=Your changes have been successfully applied .&guildID=${req.params.guildID}`)

  
})
module.exports = app;
