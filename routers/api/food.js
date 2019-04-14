const express = require('express');
const Router = express.Router();
const Food = require('../../MongoDBModules/food');

Router.post('/save', (req, res) => {
    Food.findOne({FoodNumber: req.body.FoodNumber})
        .then(food => {
                const newFood = new Food({
                    FoodName: req.body.FoodName,
                    FoodNumber: req.body.FoodNumber.toString(),
                    FoodPrice: req.body.FoodPrice,
                    FoodType: req.body.FoodType,
                    desc: req.body.desc,
                    FoodImg: req.body.FoodImg
                });
                newFood.save()
                    .then(re => {
                        res.json({message: 'success'})
                    })
                    .catch(err => {
                        res.json({message: 'error'});
                        console.log(err)
                    })
        })
});

Router.post('/getFood',(req,res)=>{
    let ip = req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip.replace(/::ffff:/, '');
    if (req.body.FoodType){
        Food.find({FoodType:req.body.FoodType})
            .then(food=>{
                food.map(item=>{
                    item.FoodImg=`//${ip}:5000${item.FoodImg}` ;
                    return {
                        ...item
                    }
                });
                res.json(food)
            })
            .catch(err=>{
                console.log(err)
            })
    } else {
        Food.find({})
            .then(food=>{
                food.map(item=>{
                   item.FoodImg=`//${ip}:5000${item.FoodImg}` ;
                   return {
                       ...item
                   }
                });
                res.json(food)
            })
            .catch(err=>{
                console.log(err)
            })
    }

});

module.exports = Router;