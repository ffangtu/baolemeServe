const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    admin:{
        type:Number,
        default:0
    },
    time:{
        type:Date,
        default: Date.now()
    },
    address:{
        type:String
    }
});

module.exports=Users=mongoose.model('users',UserSchema);