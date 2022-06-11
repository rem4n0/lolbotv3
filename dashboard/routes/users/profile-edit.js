const app = require('express').Router();
const market =require (`${process.cwd()}/shop/market.json`);
const _ = require ('lodash');
app.get("/profile/:userID/edit", global.checkAuth, async (req, res) => {
  
  
  const maintenance = await Maintenance.findOne({
  server: config.serverid
})

if(maintenance && maintenance.toggle == "true") {

     return res.render(res, req, "maintenance.ejs")

}


  
    if(req.params.userID != req.user.id) return res.redirect('/profile/'+req.user.id+'/edit');
    await bot.users.fetch(req.user.id).then(async member => {
        const data = await User.findOne({
            userID: member.id
        });
        res.render("users/profile-edit.ejs", {
        	bot: bot,
            path: req.path,
            config: config,
            user: req.isAuthenticated() ? req.user : null,
            req: req,
            market:market,
            data:data,
          _:_,
            member: member
        });
    });
});
app.post("/profile/:userID/edit", global.checkAuth, async (req, res) => {
    let rBody = req.body;
  const d = new Date();
  await bot.users.fetch(req.user.id).then(async (member)=>{
    await User.findOneAndUpdate({
        userID: member.id
    }, {
        $set: {
          "attch.background": rBody['background']|| null,
            info: rBody['biography']||null,
            website: rBody['website']||null,
            "laschange.date": d.getFullYear(),
            github: rBody['github']||null,
            twitter: rBody['twitter']||null,
            instagram: rBody['instagram']||null,
          "attch.color": rBody['color']||null
        }
    }, {
        upsert: true
    })})
    return res.redirect('?success=true&message=Your profile has been successfully edited.');
});

module.exports = app;
