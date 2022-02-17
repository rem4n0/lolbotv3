const app = require('express').Router();

  
  
  
  app.get('/', async(req,res)=>{
  res.render('/index.ejs',{

  })
  
})/*
app.post('/', async(req,res)=>{
  let data = await Data.findOneAndUpdate({name:
    req.body.title
  })
  if(!data){
    Guild.create({
      name: req.body.guildID
    })}
  res.redirect('/')
 
})*/

module.exports = app;
