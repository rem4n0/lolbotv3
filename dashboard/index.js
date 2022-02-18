const express = require("express");
const app = (global.app = express());
const bodyParser = require("body-parser");

const ejs = require("ejs");

const url = require("url");
const path = require("path");

const btoa = require("btoa");
const passport = require("passport");
const session = require("express-session");
const Strategy = require("passport-discord").Strategy;

const Discord = require("discord.js");
//const channels = config.server.channels;
const secret = "4sLVfecFJoDVtL48b3L8Vue_2fBhX1e8";
const MemoryStore = require("memorystore")(session);
const fetch = require("node-fetch");
const cookieParser = require("cookie-parser");
const referrerPolicy = require("referrer-policy");
app.use(referrerPolicy({ policy: "strict-origin" }));
const rateLimit = require("express-rate-limit");
var MongoStore = require("rate-limit-mongo");

module.exports = async (bot) => {
  app.set("views", path.join(__dirname, "./views"));

  app.engine("html", ejs.renderFile);
  app.set("view engine", "ejs");

  app.use(express.static(path.join(__dirname, "./public")));

  const http = require("http").createServer(app);
  http.listen(8080, () => {
    console.log("Website running on 80 port.");
  });

  /*app.listen(8080,async()=>{
  
  console.log('data was redy')})*/

  const apiLimiter = rateLimit({
    store: new MongoStore({
      uri: config.mongoURL,
      collectionName: "rate-limit",
      expireTimeMs: 60 * 60 * 1000,
      resetExpireDateOnChange: true,
    }),
    windowMs: 60 * 60 * 1000,
    max: 4,
    message: {
      error: true,
      message:
        "Too many requests, you have been rate limited. Please try again in one hour.",
    },
  });

  var minifyHTML = require("express-minify-html-terser");
  app.use(
    minifyHTML({
      override: true,
      exception_url: false,
      htmlMinifier: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true,
      },
    })
  );

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));

  passport.use(
    new Strategy(
      {
        clientID: config.clientID,
        clientSecret: secret,
        callbackURL: config.callback,
        scope: ["identify", "guilds"],
      },
      (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => done(null, profile));
      }
    )
  );

  app.use(
    session({
      store: new MemoryStore({ checkPeriod: 86400000 }),
      secret:
        "#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n",
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  global.checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
  };

  app.get(
    "/login",
    (req, res, next) => {
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
    passport.authenticate("discord")
  );
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
                  headers: { "Authorization": `Bot ${bot.token}` }
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
    var getIP = require("ipware")().get_ip;
    var ipInfo = getIP(req);
    var geoip = require("geoip-lite");
    var ip = ipInfo.clientIp;
    var geo = geoip.lookup(ip);

    if (geo) {
      await Site.updateOne(
        { id: config.clientID },
        { $inc: { [`country.${geo.country}`]: 1 } },
        { upsert: true }
      );
    }
    return next();
  });

  app.use("/", require("./routes/index.js"));

  app.use((req, res) => {
    req.query.code = 404;
    req.query.message = `Page not found.`;

    res.status(404).render("error.ejs", {});
  });
};
