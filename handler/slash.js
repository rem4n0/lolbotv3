const Discord = require("discord.js");

const fs = require("fs");
const ascii = require("ascii-table");
const table = new ascii().setHeading("Command", "Load Status");

const { REST } = require("@discordjs/rest");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Routes } = require("discord-api-types/v9");

const rest = new REST({ version: "9" }).setToken(config.token);
const guild = "939212559356145736";
module.exports = async (bot) => {
  //////resting slash command
  const commands = [];

  bot.once("ready", async () => {
    try {
      console.log("Started refreshing application (/) commands.");

      if (!guild) {
        await rest.put(Routes.applicationCommands(config.clientID), {
          body: commands,
        });
        console.log("Successfully registered application commands globally");
      } else {
        await rest.put(
          Routes.applicationGuildCommands(config.clientID, guild),
          {
            body: commands,
          }
        );
        console.log(
          "Successfully registered application commands for development guild"
        );

        console.log("Successfully reloaded application (/) commands.");
      }
    } catch (error) {
      console.log(error);
    }
  });

  fs.readdirSync("./CC-slash/").forEach((dir) => {
    const commandFiles = fs
      .readdirSync(`./CC-slash/${dir}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      let command = require(`../CC-slash/${dir}/${file}`);
    
  let Command = new SlashCommandBuilder().setName(String(command.name).toLowerCase()).setDescription(command.description);
    for(const option of command.options){  

      if(option.User && option.User.name && option.User.description){
								Command.addUserOption((op) =>
												op.setName(String(option.User.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.User.description).setRequired(option.User.required)
											)
										}
    }
      
      commands.push(Command.toJSON());
      bot.slash.set(command.name,command);
      table.addRow(file, "👍");
      console.log(table.toString());
    }
  });
};
