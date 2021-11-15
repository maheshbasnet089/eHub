const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    phone : {
        type:Number,
        required : true
    },
    activated : {
        type : Boolean,
        required : true,
        default : false
    }

},{
    timestamps:true
})
module.exports = mongoose.model('User',userSchema)