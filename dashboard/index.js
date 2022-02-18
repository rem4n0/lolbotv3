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
const secret = config.secret;
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
        clientSecret: config.secret,
        callbackURL: config.callback,
        scope: ["identify", "guilds", "guilds.join"],
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
  
/*
  req.session.destroy(() => {
        res.json({ login: false, message: "You have been blocked from vCodes.", logout: true })
        req.logout();
        })*/
  
    
  
const redirectURL = req.query.states[req.query.state] || "/";
      
      const params = new URLSearchParams();
	params.set("grant_type", "authorization_code");
///	params.set("code", req.query.code);
	params.set("redirect_uri", `${config.callback}`);
	let response = await fetch("https://discord.com/api/oauth2/token", {
		method: "POST",
		body: params.toString(),
		headers: {
			Authorization: `Basic ${btoa(`${bot.user.id}:${secret}`)}`,
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
      
      
    
      
      
      ///res.redirect(/*req.session.backURL |*/'/')
    
    
    const tokens = await response.json();
	// If the code isn't valid
	if( tokens.error||!tokens.access_token){
    return;};
    res.redirect(r)                  
                                           
                                         
  })
  
  
  
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
  
  
  app.use('/', require ('./routes/index.js'));

  app.use((req, res) => {
    req.query.code = 404;
    req.query.message = `Page not found.`;

    res.status(404).render("error.ejs", {});
  })
};
