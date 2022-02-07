

module.exports= class{
  async run(bot){
  bot.user.setActivity("Bohelp", { type: "WATCHING" });
  console.log(`${bot.user.username}: registered`)
let allCommands =[];
  const guild ="939212559356145736";
		bot.once("ready", () => {
			if(!guild){
				bot.application.commands.set(allCommands)
				.then(slashCommandsData => {
					client.slash= slashCommandsData;
					console.log(`${slashCommandsData.size} slashCommands ${`(With ${slashCommandsData.map(d => d.options).flat().length} Subcommands)`.green} Loaded for all: ${`All possible Guilds`.underline}`.brightGreen); 
					console.log(`Because u are Using Global Settings, it can take up to 1 hour until the Commands are changed!`.bold.yellow)
				}).catch((e)=>{console.log(e.name)});
			} else {
				bot.guilds.cache.map(g => g).forEach(async (guild) => {
					try{
						await guild.commands.set([]).catch((e)=>{});
						guild.commands.set(allCommands)
						.then(slashCommandsData => {
							bot.slash= slashCommandsData;
							console.log(`${slashCommandsData.size} slashCommands ${`(With ${slashCommandsData.map(d => d.options).flat().length} Subcommands)`.green} Loaded for: ${`${guild.name}`.underline}`.brightGreen); 
						}).catch((e)=>{console.log(e.name)});
					}catch (e){
						console.log(String(e).grey)
					}
				});
			}
		})

   // bot.guilds.cache.get('850129663896190996').commands.set(c
    const checkUnmutes = require("../helpers/Checkunmute.js");
		checkUnmutes.init(bot);

}}
