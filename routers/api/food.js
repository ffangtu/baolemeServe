const express=require('express');
const Router=express.Router();
const Food=require('../../MongoDBModules/food');

Router.post('/save',(req,res)=>{
    Food.findOne({FoodNumber:req.body.FoodName})
        .then(food=>{
            if (food){

            } else {
                const newFood=new Food(req.body);
                newFood.save()
                    .then(re=>{
                        res.json({message:'success'})
                    })
                    .catch(err=>{
                        res.json({message:'error'});
                        console.log(err)
                    })
            }
        })
});

module.exports=Router;