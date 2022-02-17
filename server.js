const { Discord, Client } = require("discord.js");
const bot = global.bot = new Client({
  intents: [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGES",
    "GUILD_VOICE_STATES"
  ],
  allowedMentions: {
    parse: ["everyone", "roles", "users"],
    repliedUser: true,
  },
  partials: ["CHANNEL", "MESSAGE", "REACTION", "USER"],
});
///const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD] });
global.config = require("./config.json");
const { Util } = require("discord.js");
const fs = require("fs");
const prefix = global.prefix = config.prefix;
const { Collection, MessageEmbed } = require("discord.js");
const beautify = require("js-beautify");
const { inspect } = require("util");
const cmd = require("node-cmd");

global.mongoose = require("mongoose");
/*
mongoose
  .connect(config.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the Mongodb database.");
  })
  .catch((err) => {
    console.log("Unable to connect to the Mongodb database. Error:" + err);
  });*/
global.Log = bot.channels.cache.get(config.channels.logChannel);
global.Debug = bot.channels.cache.get(config.channels.debug);
global.Guild = require("./data/guild.js");
global.User = require("./data/user.js");
global.Owner = require("./data/owner.js");
global.Prime = require("./data/prime.js");
global.Mute = require("./data/mute.js");
//global.Lang = require("./data/lang.js");

global.News = require("./data/news.js");
///global.Maintenance = require("./data/maintenance.js");
global.Black = require("./data/blacklist");
bot.commands = new Collection();
bot.aliases = new Collection();
bot.slash = new Collection();
bot.cooldowns = new Collection();

bot.databaseCache = {};
bot.databaseCache.users = new Collection();
bot.databaseCache.guilds = new Collection();
bot.databaseCache.members = new Collection();
bot.databaseCache.usersReminds = new Collection(); // members with active reminds
bot.databaseCache.mutedUsers = new Collection(); // members who are currently muted
bot.xp= new Collection ();
bot.catagories = fs.readdirSync("./commands/");
["command", "event","slash"].forEach((handler) => {
  require(`./handler/${handler}`)(bot);
});

/////////dashboard

require("./dashboard/index.js")()


require("./data/connect.js")()

bot.login(config.token);
