
  const url = require("url");
  const path = require("path");
  const express = require("express");
  const passport = require("passport");
  const session = require("express-session");
  const Strategy = require("passport-discord").Strategy;
  const ejs = require("ejs");
  const bodyParser = require("body-parser");
  const Discord = require("discord.js");
  const config = require(`${process.cwd()}/config.json`);
global.config = config;
  //const channels = config.server.channels;
  const app = express();
  const MemoryStore = require("memorystore")(session);
  const fetch = require("node-fetch");
  const cookieParser = require('cookie-parser');
  const referrerPolicy = require('referrer-policy');
  app.use(referrerPolicy({ policy: "strict-origin" }))
  const rateLimit = require("express-rate-limit");
  var MongoStore = require('rate-limit-mongo');

  // MODELS
  
  module.exports = async (client) => {

    const apiLimiter = rateLimit({
      store: new MongoStore({
         uri: global.config.mongoURL,
         collectionName: "rate-limit",
         expireTimeMs:  60 * 60 * 1000,
         resetExpireDateOnChange: true
         }),
           windowMs: 60 * 60 * 1000,
           max: 4,
           message:
       ({ error: true, message:  "Too many requests, you have been rate limited. Please try again in one hour." })
    });

    var minifyHTML = require('express-minify-html-terser');
    app.use(minifyHTML({
        override:      true,
        exception_url: false,
        htmlMinifier: {
            removeComments:            true,
            collapseWhitespace:        true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes:     true,
            removeEmptyAttributes:     true,
            minifyJS:                  true
        }
    }));

    app.set('views', path.join(__dirname, '/views'));
   app .use(express.static(path.join(__dirname, "/public")))
		/
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((obj, done) => done(null, obj));
  
    passport.use(new Strategy({
      clientID: config.clientID,
      clientSecret: config.secret,
      callbackURL: config.callback,      
      scope: ["identify", "guilds", "guilds.join"]
    },
    (accessToken, refreshToken, profile, done) => { 
      process.nextTick(() => done(null, profile));
    }));
  
    app.use(session({
      store: new MemoryStore({ checkPeriod: 86400000 }),
      secret: "#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n",
      resave: false,
      saveUninitialized: false,
    }));
  
    app.use(passport.initialize());
    app.use(passport.session());
  
  
    app.engine("html", ejs.renderFile);
    app.set("view engine", "ejs");
  
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
  
    global.checkAuth = (req, res, next) => {
      if (req.isAuthenticated()) return next();
      req.session.backURL = req.url;
      res.redirect("/login");
    }
   app.get("/login", (req, res, next) => {
      if (req.session.backURL) {
        req.session.backURL = req.session.backURL; 
      } else if (req.headers.referer) {
        const parsed = url.parse(req.headers.referer);
        if (parsed.hostname === app.locals.domain) {
          req.session.backURL = parsed.path;
        }
      } else {
        req.session.backURL = "/";
       }
      next();
    },
    passport.authenticate("discord", { prompt: 'none' }));
    app.get("/callback", passport.authenticate("discord", { failureRedirect: "/error?code=999&message=We encountered an error while connecting." }), async (req, res) => {
        let banned = await Black.findOne({userID: req.user.id})
        if(banned) {
               req.session.destroy(() => {
        res.json({ login: false, message: "You have been blocked from dashboard.", logout: true })
        req.logout();
        });
        } else {
            try {
              const request = require('request');
              request({
                  url: `https://discordapp.com/api/v8/guilds/${config.serverid}/members/${req.user.id}`,
                  method: "PUT",
                  json: { access_token: req.user.accessToken },
                  headers: { "Authorization": `Bot ${client.token}` }
              });
        } catch {};
        res.redirect(req.session.backURL || '/')
               }
    });
    app.get("/logout", function (req, res) {
      req.session.destroy(() => {
        req.logout();
        res.redirect("/");
      });
    });
  
    app.use(async (req, res, next) => {
        var getIP = require('ipware')().get_ip;
        var ipInfo = getIP(req);
        var geoip = require('geoip-lite');
        var ip = ipInfo.clientIp;
        var geo = geoip.lookup(ip);
        
        if(geo) {
        
          await Site.updateOne({ id: config.clientID }, {$inc: {[`country.${geo.country}`]: 1} }, { upsert: true})
        }
        return next();
    })
    const http = require('http').createServer(app);
    const io = require('socket.io')(http);
    io.on('connection', socket => {
        io.emit("userCount", io.engine.clientsCount);
    });
    http.listen(3000, () => { console.log("Website running on 3000 port.")});

    //------------------- Routers -------------------//

    /* General */
    console.clear();/*
       app.use(async (req, res, next) => {
       if(req.path.includes('/admin')) {
        if (req.isAuthenticated()) {
          if(client.guilds.cache.get(config.server.id).members.cache.get(req.user.id).roles.cache.get(global.config.server.roles.administrator) || client.guilds.cache.get(config.server.id).members.cache.get(req.user.id).roles.cache.get(global.config.server.roles.moderator) || req.user.id === "714451348212678658") {
              next();
              } else {
              res.redirect("/error?code=403&message=You is not competent to do this.")
          }
        } else {
          req.session.backURL = req.url;
          res.redirect("/login");
        }
       } else {
           next();
       }
    })*/
app.use('/', require ('./routes/index.js'));
        app.use((req, res) => {
        req.query.code = 404;
        req.query.message = `Page not found.`;
        res.status(404).render("error.ejs", {
            bot: bot,
            path: req.path,
            config: global.config,
            user: req.isAuthenticated() ? req.user : null,
            req: req,
        
        })
    });
  };

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
