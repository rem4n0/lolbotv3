

const express = require ('express');
global.app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}))

const ejs = require ('ejs');


const path = require ("path");






    app.set('views', path.join(__dirname, './views'));

    app.engine("html", ejs.renderFile);
    app.set("view engine", "ejs");
  



app.use("/", require ('./routes/index.js'));

app.use(express.static(path.join(__dirname, "./public")))
		
const http = require('http').createServer(app);
   http.listen(8080, () => { console.log("Website running on 80 port.")});

  /*app.listen(8080,async()=>{
  
  console.log('data was redy')})*/

  app.use((req, res) => {
        req.query.code = 404;
        req.query.message = `Page not found.`;
    
        res.status(404).render("error.ejs", {
            
        })
    


      
  
        
    });