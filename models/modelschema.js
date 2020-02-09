let mongoose=require('mongoose')
const bookschema=mongoose.Schema({
     _id: mongoose.Schema.Types.ObjectId,
     BookName:String,
     AuthorName:String,
     Price:Number,
     Publisher:String,
     Yearofpublish:Number
},{ collection: 'BookDetails' })
module.exports=mongoose.model("Bookschema",bookschema)