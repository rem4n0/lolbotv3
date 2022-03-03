const app = require("express").Router();
const path = require("path");

app.get("/dashboard",global.checkAuth,async(req, res,next)=> {
  
  const user = bot.users.fetch(req.user.id).then(async(a)=>{
  let data = await User.findOne({userID:a.id});
const server_rank = await User.find({})
                                                          
      .then(docs => Promise.resolve(docs.sort((A,B) => B.data.global_xp - A.data.global_xp)))
      .then(sorted => sorted.findIndex(x => x.userID === data.userID) + 1);

  res.render("dashboard.ejs", {
    botrank:server_rank,
    config: config,
    support:config.support,
    data:data,

    bot: bot,
    user:req.isAuthenticated() ? req.user : null,
  })});
}); 
module.exports = app;
