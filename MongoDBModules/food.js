const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const FoodSchema=new Schema({
    FoodName:{
        type:String,
        required:true
    },
    FoodNumber:{
      type:String,
      required:true
    },
    FoodType: {
        type:String,
        required: true
    },
    FoodImg:{
        type:String
    },
    FoodPrice:{
        type:Number,
        required:true
    },
    Surplus:{
        type:Number,
        required:true
    }
});
module.exports=Food=mongoose.model('Food',FoodSchema);