

module.exports= class{
  async run(bot){
const guilds = await bot.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)
  bot.user.setActivity(`/help| ${bot.guilds.cache.size} Servers`, { type: "PLAYING" });
  console.log(`${bot.user.username}: registered`);
    const checkUnmutes = require("../helpers/Checkunmute.js");
		checkUnmutes.init(bot);
    const dbl = require ("../helpers/dbl.js");
	  dbl.init(bot);

}}
