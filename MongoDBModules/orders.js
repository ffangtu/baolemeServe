const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const OrdersSchema=new Schema({
    phone:{
        type:String,
        required:true
    },
    time:{
        type: Date,
        default:Date.now()
    },
    FoodName: {
        type:String,
        required: true
    },
    count:{
        type:Number,
        required:true
    }
});
module.exports=Orders=mongoose.model('orders',OrdersSchema);