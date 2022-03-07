const app = require("express").Router();
const path = require("path");
console.log("setting router loaded");
app.get(
  "/dashboard/guild/:guildID/xpsystem",
  global.checkAuth,
  async (req, res, next) => {
    const guild = bot.guilds.cache.get(req.params.guildID)
  let data = await Guild.findOne({guildID: guild.id});
      res.render("./guild/xpsystem.ejs", {
        config: config,
        data:data,
        req: req,
        bot: bot,
        guild: guild,
        user: req.isAuthenticated() ? req.user : null,
      })
    });

    app.post(
      "/dashboard/guild/:guildID/xpsystem",
      global.checkAuth,
      async (req, res) => {
        const guild = bot.guilds.cache.get(req.params.guildID);
        let rbody = req.body;
      
      if (req.body.max.length > 10){
          return res.redirect( 
            "?error=true&message=You cant add up 10 point of maximum xp..");}
if(req.body.min.length > 5){ return res.redirect("?error=true&message= you can't add up 5 point of minimum xp")}
        let data = await Guild.findOne({guildID: guild.id})
        
        
       
        
        await Guild.findOneAndUpdate({
          
          guildID: req.params.guildID},{
          $set:{
  
            "channels.xp":req.body.xpchannelll,
            "xp.max":req.body.max,
            "xp.min": req.body.min,     
            "xp.onoff":req.body.xp, 
            "xp.message": req.body.xpmessage,
            
          }})
                
      
        
      
        /*res.redirect(
          `?success=true&message= your applied  `
        );*/return res.send({ success: true, message: "Server succesfuly added." });
      }
    );
module.exports = app;
