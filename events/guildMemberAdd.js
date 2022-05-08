const stringCleaner = require("@sindresorhus/slugify");
const Canvas = require("canvas"),
  Discord = require("discord.js");
const { resolve } = require("path");
const guildInvites = new Map();
// Register assets fonts

const applyText = (canvas, text, defaultFontSize) => {
  const ctx = canvas.getContext("2d");
  do {
    ctx.font = `${(defaultFontSize -= 10)}px Bold`;
  } while (ctx.measureText(text).width > 600);
  return ctx.font;
};
const canvas = Canvas.createCanvas(1024, 450);
console.log(canvas.width)
const ctx = canvas.getContext("2d");
module.exports = class {
  async run(member, bot, message) {
    /* const guildInvites = await member.guild.invites.fetch();
    console.log(guildInvites);
    */
    //   const uses = guildInvites.find((codes) => codes.uses);

    //   const UserInvited = await bot.users.fetch(uses.inviterId);

    const guildData = await Guild.findOne({ guildID: member.guild.id });
    member.guild.data = guildData;

    const memberData = await Mute.findOne({
      id: member.id,
      guildID: member.guild.id,
    });
let welcomeimg = guildData.plugins.welcome.welcomeImage

    if (memberData) {
      if (memberData.mute.muted && memberData.mute.endDate > Date.now()) {
        member.guild.channels.cache.forEach((channel) => {
          channel.permissionOverwrites
            .edit(member.id, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
              CONNECT: false,
            })
            .catch(() => {});
        });
      }
    }

    // Check if the autorole is enabled
    if (!guildData) return;
    if (guildData.plugins.autorole.enabled) {
      member.roles.add(guildData.plugins.autorole.role).catch(() => {});
    }

    // Check if welcome message is enabled
    if (guildData.plugins.welcome.enabled) {
      const channel = member.guild.channels.cache.get(
        guildData.plugins.welcome.channel
      );
      if (channel) {
        const message = guildData.plugins.welcome.message
          .replace(/{user}/g, member)
          .replace(/{userName}/g, member.username)
          .replace(/{server}/g, member.guild.name)
          .replace(/{membercount}/g, member.guild.memberCount);
    
        
          if (guildData.plugins.welcome.withImage) {
          
            // Backgroundimage
            const background = await Canvas.loadImage(
            guildData.plugins.welcome.welcomeImage.endsWith(["png","jpg"])||null
            );
            // This uses the canvas dimensions to stretch the image onto the entire canvas
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            // Draw username
            ctx.fillStyle = "#ffffff";
            const username = stringCleaner(member.user.username, {
              separator: " ",
              lowercase: false,
              decamelize: false,
              preserveLeadingUnderscore: true,
            });
            ctx.font = applyText(canvas, username, 48);
            ctx.fillText(username, canvas.width - 660, canvas.height - 248);
            // Draw server name
            ctx.font = applyText(canvas, member.guild.name, 53);
            ctx.fillText(
              member.guild.name,
              canvas.width - 690,
              canvas.height - 65
            );
            // Draw discriminator
            ctx.font = "40px Bold";
            ctx.fillText(
              member.user.discriminator,
              canvas.width - 623,
              canvas.height - 178
            );
            // Draw number
            ctx.font = "22px Bold";
            ctx.fillText(member.guild.memberCount, 40, canvas.height - 50);
            // Draw # for discriminator
            ctx.fillStyle = "#44d14a";
            ctx.font = "75px SketchMatch";
            ctx.fillText("#", canvas.width - 690, canvas.height - 165);
            // Draw Title with gradient
            ctx.font = "90px Bold";
            ctx.strokeStyle = "#1d2124";
            ctx.lineWidth = 15;
            ctx.strokeText(
              guildData.plugins.welcome.title|| "welcome",
              canvas.width - 620,
              canvas.height - 330
            );
            var gradient = ctx.createLinearGradient(
              canvas.width - 780,
              0,
              canvas.width - 30,
              0
            );
            gradient.addColorStop(0, "#e15500");
            gradient.addColorStop(1, "#e7b121");
            ctx.fillStyle = gradient;
            ctx.fillText(guildData.plugins.welcome.title ||"welcome", canvas.width - 620, canvas.height - 330);

            // Pick up the pen
            ctx.beginPath();
            //Define Stroke Line
            ctx.lineWidth = 10;
            //Define Stroke Style
            ctx.strokeStyle = "#03A9F4";
            // Start the arc to form a circle
            ctx.arc(180, 225, 135, 0, Math.PI * 2, true);
            // Draw Stroke
            ctx.stroke();
            // Put the pen down
            ctx.closePath();
            // Clip off the region you drew on
            ctx.clip();

            const options = { format: "png", size: 512 },
              avatar = await Canvas.loadImage(
                member.user.displayAvatarURL(options)
              );
            // Move the image downwards vertically and constrain its height to 200, so it"s a square
            ctx.drawImage(avatar, 45, 90, 270, 270);

            const attachment = new Discord.MessageAttachment(
              canvas.toBuffer(),
              "welcome-image.png"
            );

            channel.send({ content: message, files: [attachment] });
          } else {
            channel.send({ content: message});
          }
        }
    
    }
  }
};
