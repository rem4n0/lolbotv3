const app = require("express").Router();

const path = require("path");

///const partnersdata = require("../database/models/partners/partner.js");
console.log(" Partners router loaded.");

app.get("/partners", async (req, res) => {
  
  res.render("partners.ejs", {
    bot: bot,
    path: req.path,
    config: global.config,
    user: req.isAuthenticated() ? req.user : null,
    req: req,
    db:Partner.find(),
    
  });
});

module.exports = app