const app = require("express").Router();
const path = require("path");
console.log("setting router loaded");
const market= require(`${process.cwd()}/shop/market.json`);
app.get(
  "/items",
  global.checkAuth,
  async (req, res, next) => {
    const user = bot.users.cache.get(req.user.id);
    let data = await User.findOne({ userID: user.id});
    res.render("./bot/items.ejs", {
      config: config,
      market: market,
      data: data,
      req: req,
      bot: bot,
  
      user: req.isAuthenticated() ? req.user : null,
    });
  }
);
/*
app.post( "/bgs",
  global.checkAuth,
  async (req, res) => {
    let rbody = req.body;

let user = bot.users.cache.get(req.user.id);
    let data = await User.findOne({ userID:user.id });

  
  
  
   data.inventory.push({
     
     id:rbody["id"],
    
   })
data.save();
  /*  await User.findOneAndUpdate(
      {
        userID: user.id,
      },
      {
        $push: {
          "inventory.id":image,
          "inventory.amount": price,
        }
          
            
            
          
        },
    );

      
      
  //  res.redirect(`?success=true&message=Your background has been successfully added`)
      
    

    return res.redirect({ success: true, message: "successfully" });
  }
);*/
module.exports = app;
