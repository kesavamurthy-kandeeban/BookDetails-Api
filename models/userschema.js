let mongoose=require('mongoose')
const userschema=mongoose.Schema({
    UserName:String,
    Password:String,
    },{ collection: 'User' })
module.exports=mongoose.model("Userschema",userschema)