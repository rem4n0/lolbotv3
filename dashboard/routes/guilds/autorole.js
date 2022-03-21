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
    
    
    
    await Guild.findOneAndUpdate({ guildID: req.params.guildID},{
      
      
      $set:{
        "plugins.autorole.enabled":rbody["onoff"],
        "plugins.autorole.role":rbody["role"]
        
      },
    })
                                  
                                  
                                  
                                  
                                  
    
    /*
    if(Object.prototype.hasOwnProperty.call(rbody, "roleDisable")){

      const autorole ={
        enabled:false,
        role:null,
      }
      data.plugins.autorole =autorole;
		data.markModified("plugins.autorole");
		await data.save();
   return res.send({success: true, message: "successfully"});
  } 
    
  if(Object.prototype.hasOwnProperty.call(rbody, "roleEnable")){
  
const autorole = {
  enable: true,
  role: guild.roles.cache.find((r) => "@"+r.name === rbody["role"])
		
      
}
      data.plugins.autorole = autorole;
      data.markModified("plugins.autorole")
      await data.save();
 //return res.send({ success: true, message:" Successfuy"});

      
    }
    */
   
//return res.send({ success: true, message: "successfully" });
  }
);

module.exports = app;
