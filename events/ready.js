

module.exports= class{
  async run(bot){
  bot.user.setActivity(`https://boboworld.tk |${bot.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0) } Users`, { type: "WATCHING" });
  console.log(`${bot.user.username}: registered`);
    const checkUnmutes = require("../helpers/Checkunmute.js");
		checkUnmutes.init(bot);
    

}}
