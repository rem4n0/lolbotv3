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

      let Command = new SlashCommandBuilder()
        .setName(String(command.name).toLowerCase())
        .setDescription(String(command.description));
     /* let option = new SlashCommandBuilder()
        .setName(String(command.options.name).toLowerCase())
        .setDescription(String(command.options.description))
        .setRequired(Boolean(command.options.required));
        */
      if (command.options && command.options.length > 0) {
        for (const option of command.options) {
          if (option.User && option.User.name && option.User.description) {
            Command.addUserOption((op) =>
              op
                .setName(
                  String(option.User.name).replace(/\s+/g, "_").toLowerCase()
                )
                .setDescription(option.User.description)
                .setRequired(option.User.required)
            );
          }else if(option.Integer && option.Integer.name && option.Integer.description){
											Command.addIntegerOption((op) =>
												op.setName(String(option.Integer.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.Integer.description).setRequired(option.Integer.required)
											)
										} else if(option.String && option.String.name && option.String.description){
											Command.addStringOption((op) =>
												op.setName(String(option.String.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.String.description).setRequired(option.String.required)
											)
										} else if(option.Channel && option.Channel.name && option.Channel.description){
										Command.addChannelOption((op) =>
												op.setName(String(option.Channel.name).toLowerCase()).setDescription(option.Channel.description).setRequired(option.Channel.required)
      
											)
										} else if(option.Role && option.Role.name && option.Role.description){
										Command.addRoleOption((op) =>
												op.setName(String(option.Role.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.Role.description).setRequired(option.Role.required)
											)
										} else if(option.StringChoices && option.StringChoices.name && option.StringChoices.description && option.StringChoices.choices && option.StringChoices.choices.length > 0){
										Command.addStringOption((op) =>
												op.setName(String(option.StringChoices.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.StringChoices.description).setRequired(option.StringChoices.required)
												.addChoices(option.StringChoices.choices.map(c=> [String(c[0]).replace(/\s+/g, '_').toLowerCase(),String(c[1])] )),
											)
										} else if(option.IntChoices && option.IntChoices.name && option.IntChoices.description && option.IntChoices.choices && option.IntChoices.choices.length > 0){
											Command.addStringOption((op) =>
												op.setName(String(option.IntChoices.name).replace(/\s+/g, '_').toLowerCase()).setDescription(option.IntChoices.description).setRequired(option.IntChoices.required)
												.addChoices(option.IntChoices.choices.map(c=> [String(c[0]).replace(/\s+/g, '_').toLowerCase(),parseInt(c[1])] )),
											)
										} else {
											console.log(`A Option is missing the Name or/and the Description of ${command.name}`)
										}
          
          
          
          
          
        }
      }

      commands.push(Command.toJSON());
      bot.slash.set(command.name, command);
      table.addRow(file, "👍");
      console.log(table.toString());
    }
  });
};
