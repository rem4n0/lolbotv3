const app = require("express").Router();
const path = require("path");
const { createCanvas, loadImage } = require("canvas");
const market = require (`${process.cwd()}/shop/market.json`);
console.log("profile router loaded");

app.get(
  "/profile/:userID",
  global.checkAuth,
  async (req, res, next) => {
    
    const user = bot.users.fetch(req.params.userID).then(async (a)=>{
  let data = await User.findOne({userID: a.id});
      data.inventory.map((chunk, i, o)=>{
      chunk.sort((A,B) => A.id - B.id ).map(d => {
        const item = market.find(x => x.id == d.id);  
      res.render("./users/profile.ejs", {
        config: config,
        data:data,
      items: item,
        req: req,
        bot: bot,
      userdata:userdata,
        member:a,
        user: req.isAuthenticated() ? req.user : null,
      })
    })});})})
module.exports = app;
