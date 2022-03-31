const app = require("express").Router();
const path = require("path");
const Discord = require("discord.js");
const ms = require('ms');
const fs = require("fs");
const pretty = require("pretty-ms")

app.get("/daily", global.checkAuth, async (req, res, next) => {
  const user = bot.users.fetch(req.user.id).then(async (a) => {
    let data =
      (await User.findOne({ userID: a.id })) ||
      (await new User({ userID: a.id }));

    if (!user) {
      res.redirect(
        `/error?code=404&message= I can't fetch you, you must be a user of bot then try again`
      );
    }
    let cooldown =43200000;
    
    
    
    
    
  let countdown= setInterval(function() {ms(cooldown-(Date.now()-data.time))
                                         
                                  var distance = coo       
                                         
                                         
    
    
    
    
    
    res.render("./users/daily.ejs", {
      countdown:countdown,
      config: config,
      support: config.support,
      data: data,
cooldown:cooldown,
      req:req,
      res: res,
    
      bot: bot,
      user: req.isAuthenticated() ? req.user : null,
    });
  });
});


app.post("/daily", global.checkAuth, async (req,res)=>{
 let user=  bot.users.cache.get(req.user.id);
  console.log(user);
  
 let cooldown = 43200000;
      let data = await User.findOne({ userID:user.id });
  if(data.time !== null && cooldown - (Date.now() - data.time) > 0){
 res.redirect(`?error=true&message= wait ${ms(cooldown - (Date.now() - data.time))} to daily again`)
                                                                   }else{
      let DR = Math.floor(Math.random() * 2000) + 1000 
    await User.updateOne({
      userID: user.id},
                        
                         {
      $set:{
      time: Date.now()
      }},)
    await User.updateOne({
      userID: user.id},
                         {
      $inc:{
        money: DR
      }})
  
    res.redirect(`?success=true&message=Your bot has`)
}  
})
module.exports = app;
