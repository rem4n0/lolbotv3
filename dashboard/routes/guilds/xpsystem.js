const app = require("express").Router();
const path = require("path");

app.get("/dashboard/guild/:guildID/xpsystem",global.checkAuth,async(req, res,next)=> {
  
  let data = await Guild.findOne({guildID: req.params.guildID})
  const guild = bot.guilds.cache.get(req.params.guildID);
  res.render("./main/xpsystem.ejs", {
    config: config,
    support:config.support,
    data:data,
    req:req,
    bot: bot,
    guild:guild,
    user:req.isAuthenticated() ? req.user : null,
  })});


app.post("/dashboard/guild/:guildID/xpsystem", global.checkAuth, async (req,res) => {
  
      let rbody = req.body;
let data = await Guild.findOne({guildID: req.params.guildID})

if(data){
  data.xp.message= rbody["xpmessage"]
  data.channels.xp= rbody["xpchannel"]
  data.xp.max =rbody["xpmax"]
  data.xp.min= rbody["xpmin"]
  
  
}
  
  
data.save();
  
  
res.redirect(`?success=true&message=Your changes have been successfully applied .&guildID=${req.params.guildID}`)

  
})
module.exports = app;
