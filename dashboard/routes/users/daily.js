const app = require("express").Router();
const path = require("path");
const Discord = require("discord.js");
const ms = require('ms');
const fs = require("fs");
const pretty = require("pretty-ms")

app.get("/daily", global.checkAuth, async (req, res, next) => {
  const maintenance = await Maintenance.findOne({
  server: config.serverid
})

if(maintenance && maintenance.toggle == "true") {

     return res.render(res, req, "maintenance.ejs")

}


  
  
  const user = await bot.users.fetch(req.user.id).then(async (a) => {
  if(!a) return;
    let data =
      (await User.findOne({ userID: a.id })) ||
      (await new User({ userID: a.id }));

    if (!a) {
      res.redirect(
        `/error?code=404&message= I can't fetch you, you must be a user of bot then try again`
      );
    }
    let cooldown = 43200000;
    
  
   
  
  let times = cooldown - (Date.now()- data.time)
  
  //var days = Math.floor(times / (1000 * 60 * 60 * 24));
  let d = {
  h:Math.floor((times % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  m: Math.floor((times% (1000 * 60 * 60)) / (1000 * 60)),
  s:Math.floor((times % (1000 * 60)) / 1000),
  }
  
 /// var countdown=Math.floor((hours % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))     
 
                                         
  
    
    
    
    res.render("./users/daily.ejs", {
      
       times:d,
      config: config,
      support: config.support,
      data: data,
cooldown:cooldown,
      req:req,
      res: res,
    
      bot: bot,
      user: req.isAuthenticated() ? req.user : null,
    });})
});


app.post("/daily", global.checkAuth, async (req,res)=>{
 let user=  await bot.users.fetch(req.user.id);
  
  
 let cooldown = 43200000;
      let data = await User.findOne({ userID:user.id });
  if(data.time !== null && cooldown - (Date.now() - data.time) > 0){
 res.send({error:true, message:`wait for ${ms(cooldown - (Date.now() - data.time))} to daily again`})
      }
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
  
    res.redirect(`?success=true&message=claimed your daily`)

})
module.exports = app;
