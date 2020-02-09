let mongoose=require('mongoose')
const insertschema=mongoose.Schema({
    BookName:String,
    AuthorName:String,
    Price:Number,
    Publisher:String,
    Yearofpublish:Number
},{ collection: 'BookDetails' })
module.exports=mongoose.model("Insertschema",insertschema)