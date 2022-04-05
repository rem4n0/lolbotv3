const app = require("express").Router();
const path = require("path");
console.log("setting router loaded");
const market= require(`${process.cwd()}/shop/market.json`);
app.get("/item/:id",
  global.checkAuth,
  async (req, res, next) => {
const id = market.find(x=> x.id = req.params.id);

  console.log(id);
    const user = bot.users.cache.get(req.user.id);
    let data = await User.findOne({ userID: user.id});
    res.render("./bot/buyitem.ejs", {
      id: id,
      config: config,
      market: market,
      data: data,
      req: req,
      bot: bot,
  
      user: req.isAuthenticated() ? req.user : null,
    });
  }
);

app.post( "/item",
  global.checkAuth,
  async (req, res) => {
    let rbody = req.body;

let user = bot.users.cache.get(req.user.id);
    let data = await User.findOne({ userID:user.id });

      


    return res.redirect({ success: true, message: "successfully" });
  }
);
module.exports = app;
