const app = require("express").Router();
const path = require("path");
console.log("setting router loaded");
app.get(
  "/dashboard/guild/:guildID/setting",
  global.checkAuth,
  async (req, res, next) => {
    const guild = bot.guilds.cache.get(req.params.guildID)
  let data = await Guild.findOne({guildID: guild.id});
    const user= guild.members.cache.get(req.user.id);
  if(!user.permissions.has("MANAGE_GUILD")){ 
    
    
  
    res.send(" You can't access")
  }
      res.render("./guild/setting.ejs", {
        config: config,
        data:data,
        req: req,
        bot: bot,
        guild: guild,
        user: req.isAuthenticated() ? req.user : null,
      })
    });

    app.post(
      "/dashboard/guild/:guildID/setting",
      global.checkAuth,
      async (req, res) => {
        const guild = bot.guilds.cache.get(req.params.guildID);
        let rbody = req.body;
      
       if (rbody["prefix"].length > 5){
          return res.send({error:true, message:"you can't add up 5 words"});}
        let data = await Guild.findOne({guildID: guild.id})
        
        
        
        
        await Guild.findOneAndUpdate({
          
          guildID: req.params.guildID},{
          $set:{
  
            prefix:rbody["prefix"],
           "xp.onoff":rbody["onoff"], 
          }})
                
      
        
      
      return  res.send({success:true, message:"successfully"});
      }
    );
module.exports = app;
