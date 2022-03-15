const app = require("express").Router();
const path = require("path");
console.log("setting router loaded");
const market= require(`${process.cwd()}/shop/market.json`);
app.get(
  "/bgs",
  global.checkAuth,
  async (req, res, next) => {
    const guild = bot.users.cache.get(req.user.id);
    let data = await User.findOne({ userID: req.user.id});
    res.render("./bot/background.ejs", {
      config: config,
      market: market,
      data: data,
      req: req,
      bot: bot,
  
      user: req.isAuthenticated() ? req.user : null,
    });
  }
);

app.post( "/bgs",
  global.checkAuth,
  async (req, res) => {
    let { image} = req.body;


    
    let data = await User.findOne({ userID: req.user.id });

    await User.findOneAndUpdate(
      {
        userID: req.user.id,
      },
      {
        $set: {
          "data.background": image
          
        },
      }
    );

      
      
  //  res.redirect(`?success=true&message=Your background has been successfully added`)
      
    

    return res.redirect({ success: true, message: "successfully" });
  }
);
module.exports = app;
