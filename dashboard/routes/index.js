const app = require('express').Router();
const path = require('path')
  
  
  
  app.get('/', async(req,res)=>{
    
    //let data = await Guild.findOne({guildID:req.
  res.render('index.ejs',{
  
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
