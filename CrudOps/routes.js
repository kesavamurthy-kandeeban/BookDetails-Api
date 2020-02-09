const bodyparser=require('body-parser')
const urlencoded=bodyparser.urlencoded({extended: false})
const Bookschema=require('../models/modelschema')
const Insertschema=require('../models/insertschema')
const jwt=require('jsonwebtoken')
const express=require('express')
const Configration=require('../Config/configration')

module.exports=function(app,db)
{
   
       
    app.post('/',urlencoded,(req,res)=>
    {
       
        $: insertmodel=new Insertschema(
            {
                 BookName:req.body.BookName,
                 AuthorName:req.body.AuthorName,
                 Price:req.body.Price,
                 Publi0sher:req.body.Publisher,
                 Yearofpublish:req.body.Yearofpublish
                 
            })
                insertmodel.save().then(result=>{
                res.status(201).json({
                    message: "Cretaed successfully",
                    createdProduct: result
                  });
            })
            .catch(err=>{ console.log(err);
                res.status(400).json({
                  message:"Invalid details (Bad Request)" 
                });
            })
      

    })
    app.get("/totalbook", urlencoded,(req, res) => {
        const pagination=req.query.offset?parseInt(req.query.offset):10
        const page=parseInt(req.query.page)
        Bookschema.find()
          .skip((page-1)*pagination)
          .sort({"BookName":1})
          .limit(pagination)
          .exec()
          .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      }); 
            app.get('/bookdetails', urlencoded,(req, res) => {
                const bookname = req.query.BookName;
                const authorname=req.query.AuthorName;
                Bookschema.find({'BookName':bookname,'AuthorName':authorname}).exec().then(doc=>{
                   
                    if (doc.length!==0) {
                      res.statusCode=200
                      res.json(doc);
                    } 
                    else 
                    {
                      res
                        .status(404)
                        .json({ status:404,message: "Object Id is not found" });
                    }
                  })
                  .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: err });
                  });
              })
              
              app.delete("/deletebook/:ObjectId", (req, res, next) => {
                const id = req.params.ObjectId;
                  Bookschema.remove({ _id: id })
                  .exec()
                  .then(result => {
                    res.status( 200).json(result);
                  })
                  .catch(err => {
                    console.log(err);
                    res.status(500).json({
                      error: err
                    });
                  });
              });
              
              app.patch("/:ObjectId", (req, res, next) => {
                const id = req.params.ObjectId;
                const data=req.body
                console.log(data)
                Bookschema.update({ _id: id }, { $set: data })
                  .exec()
                  .then(result => {
                    console.log(result);
                    res.status(200).json(result);
                  })
                  .catch(err => {
                    console.log(err);
                    res.status(500).json({
                      error: err
                    });
                  });
              });
 }
