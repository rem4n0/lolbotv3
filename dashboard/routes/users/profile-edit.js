const app = require('express').Router();
const market =require (`${process.cwd()}/shop/market.json`);
const _ = require ('lodash');
app.get("/profile/:userID/edit", global.checkAuth, async (req, res) => {
    if(req.params.userID != req.user.id) return res.redirect('/profile/'+req.user.id+'/edit');
    bot.users.fetch(req.user.id).then(async member => {
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
  bot.users.fetch(req.user.id).then(async (member)=>{
    await User.findOneAndUpdate({
        userID: member.id
    }, {
        $set: {
          "attch.background": rBody['background'],
            info: rBody['biography'],
            website: rBody['website'],
            "laschange.date": d.getFullYear(),
            github: rBody['github'],
            twitter: rBody['twitter'],
            instagram: rBody['instagram']
        }
    }, {
        upsert: true
    })})
    return res.redirect('?success=true&message=Your profile has been successfully edited.');
});

module.exports = app;