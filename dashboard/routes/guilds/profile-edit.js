const app = require('express').Router();


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
            
            data:data,
            member: member
        });
    });
});
app.post("/profile/:userID/edit", global.checkAuth, async (req, res) => {
    let rBody = req.body;
    await User.findOneAndUpdate({
        userID: req.user.id
    }, {
        $set: {
            info: rBody['biography'],
            website: rBody['website'],
            github: rBody['github'],
            twitter: rBody['twitter'],
            instagram: rBody['instagram']
        }
    }, {
        upsert: true
    })
    return res.redirect('?success=true&message=Your profile has been successfully edited.');
});

module.exports = app;