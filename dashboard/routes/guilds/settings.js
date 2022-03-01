const app = require("express").Router();
const path = require("path");

app.get("/dashboard/guild/:guildID",global.checkAuth,async(req, res,next)=> {
  
  let data = await Guild.findOne({guildID: req.params.guildID})
  
  res.render("./main/setting.ejs", {
    config: config,
    support:config.support,
    data:data,
    req:req,
    bot: bot,
    user:req.isAuthenticated() ? req.user : null,
  })});


app.post("/dashboard/guild/:guildID", global.checkAuth, async (req,res) => {
  
      let rbody = req.body;
let data = await Guild.findOneAndUpdate({guildID: req.params.guildID})
if(data){
  
  data.prefix= rbody["prefix"];
  data.xp.onoff= rbody["xp"];
  data.channels.xp= rbody["xpchannel"]
  
}
data.save();

  
})
module.exports = app;
