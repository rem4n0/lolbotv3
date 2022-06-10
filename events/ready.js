

module.exports= class{
  async run(bot){
const guilds = await bot.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)
  bot.user.setActivity(`https://boboworld.tk | ${guilds} Users`, { type: "WATCHING" });
  console.log(`${bot.user.username}: registered`);
    const checkUnmutes = require("../helpers/Checkunmute.js");
		checkUnmutes.init(bot);
    

}}
