const { Discord, Client } = require("discord.js");
const bot =( global.bot =new Client({
  intents: [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGES",
    "GUILD_BANS",
    "GUILD_VOICE_STATES",
    "GUILD_INVITES"
  ],
  allowedMentions: {
    parse: ["everyone", "roles", "users"],
    repliedUser: true,
  },
  partials: ["CHANNEL", "MESSAGE", "REACTION", "USER"],
}));
const {Webhook} = require("discord.js");
global.config = require("./config.json");
const { Util } = require("discord.js");
const fs = require("fs");
const translate = require ("@vitalets/google-translate-api");



const prefix = global.prefix = config.prefix;
const { Collection, MessageEmbed } = require("discord.js");
const beautify = require("js-beautify");
const { inspect } = require("util");
const cmd = require("node-cmd");
const data = {
  id: config.webhook.id2,
  token: config.webhook.token2
}
bot.queue = new Map();
global.webhook = new Webhook(data)
//const { Player } = require ("discord-player")// 
//global.Player = Player;
global.mongoose = require("mongoose");
global.Log = bot.channels.cache.get(config.channels.logChannel);
global.Debug = bot.channels.cache.get(config.channels.debug);
global.Ban = require ("./data/ban.js");

global.Guild = require("./data/guild.js");
global.User = require("./data/user.js");
global.Owner = require("./data/owner.js");
global.Prime = require("./data/prime.js");
global.Partner = require ("./data/partner.js");
global.Mute = require("./data/mute.js");
global.Site= require("./data/analysts.js");
global.News = require("./data/news.js");
global.Maintenance = require("./data/maintenance.js");
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

bot.databaseCache.channels = new Collection();
bot.databaseCache.guilds = new Collection();

bot.databaseCache.channelsReminds = new Collection ();
bot.databaseCache.lockedChannels = new Collection ();


bot.xp= new Collection ();
bot.catagories = fs.readdirSync("./commands/");
["command", "event","slash"].forEach((handler) => {
  require(`./handler/${handler}`)(bot)
});

bot.translate = async(text, message)=>{
  const data = await Guild.findOne({guildID: message.guild.id});
  const lang = data.language ? await data.language: "en";
  const translated = await translate (text,{from: "en" , to:lang});
  return translated.text;
}


require('./dashboard/index.js')(bot);
require('./data/connect.js')(bot);
/////////dashboard

///require("./dashboard/index.js")(bot);


///require("./data/connect.js")(bot);

bot.login(config.token);
