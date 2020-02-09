const express=require('express')
const app=express();
const mongoose=require('mongoose')
const db=require('./Config/db')
const BodyParser=require ('body-parser');
var port = process.env.PORT || 8080
const urlencoded=(BodyParser.urlencoded({ extended: true }))
app.use(urlencoded)
const option={ useNewUrlParser: true,}


mongoose.connect(
  db.url,option,function(error)
{
    if(error){console.log(error)
    }
    else
    {
    require('./CrudOps/routes')(app,db)
    app.listen(port, function () {
        console.log("Running RestHub on port " + port);
      })
    }
}).
  catch(error => console.log(error));
  