const app = require('express').Router();
const { Permissions } = require('discord.js');

const flags = [

	Permissions.FLAGS.MANAGE_GUILD,
];

///const channels = global.config.server.channels;
const Discord = require("discord.js")
console.log(" guild router loaded.");



app.get("/dashboard/guilds", global.checkAuth, async (req,res) => {
  const guild = bot.guilds.cache.get(req.params.guildID)
  const perms = new Permission(guild. permissions)
  
    res.render("main/guilds.ejs", {
        bot: bot,
        path: req.path,
        config: global.config,
        user: req.isAuthenticated() ? req.user : null,
        req: req,

      flag:flags,
      perms: Permissions,
    
       guildID: req.params.guildID,

	})
})/*
app.post("/dashboard/guilds", global.checkAuth, async (req,res) => {
    let { guildID } = req.body;
    const guild = bot.guilds.cache.get(req.body.guildID);
    let checkGuild = await Guild.findOne({ guildID: req.body.guildID });
  
  //  if() return res.send({ error: true, message: "Fill the must any blanks."});
    ///if(!link && !autoCreate) return res.send({ error: true, message: "Fill the must any blanks."});
    if (!guild) return res.send({ error: true, message: "You have to add me to that server first." });
    const member = guild.members.cache.get(req.user.id);
    if(!member){
      try{ await guild.members.fetch();
        member = guild.members.cache.get(req.user.id);
      } catch (err) { 
      	res.send({ error: true, message: `Couldn't fetch the members of ${guild.id}: ${err}`})
      }
    }
    
    if (!member.permissions.has("MANAGE_GUILD")) return res.send({ error: true, message: "You can only add servers with MANAGE_GUILD authorization." });
    await Guild.updateOne({
            guildID: req.body.guildID,
            
    }, {
        $set:
            {
                
                icon: guild.iconURL({ dynamic: true }),
                ownerID: guild.owner.id ? guild.owner.id : req.user.id,
            
                prefix: req.body.prefix,
              
            }
    }, { upsert: true })

    if(autoCreate === "true") {
    guild.fetchInvites().then(async fetchinvite => {
      fetchinvite.array().find(a => a.inviter.id === client.user.id)
        ? fetchinvite.array().find(a => a.inviter.id === client.user.id).code
        : await guild.channels.cache.random().createInvite({ maxAge: 0 });
    });
    guild.fetchInvites().then(async fetchinvite => {
      let inviteURL = fetchinvite
        .array()
        .find(a => a.inviter.id === client.user.id).url;
    await db.updateOne({
        id: req.params.guildID
    }, {
        $set: {
            link: inviteURL
        }
    }, { upsert: true })
    })

    } else {
    await db.updateOne({
        id: req.params.guildID
    }, {
        $set: {
            link: req.body.link
        }
    }, { upsert: true })
    }*/

module.exports = app;
