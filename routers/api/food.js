const express = require('express');
const Router = express.Router();
const Food = require('../../MongoDBModules/food');

Router.post('/save', (req, res) => {

    Food.findOne({_id: req.body._id})
        .then(food => {
            if (food && food._id !== 'null') {
                Food.updateOne({_id: req.body._id}, {
                    FoodImg: req.body.FoodImg,
                    FoodName: req.body.FoodName,
                    FoodNumber: req.body.FoodNumber,
                    FoodPrice: req.body.FoodPrice,
                    FoodType: req.body.FoodType
                }).then(re => {
                    res.json({message: 'success'})
                }).catch(err => {
                    res.json({message: 'error'})
                })
            } else {
                const newFood = Food({
                    FoodImg: req.body.FoodImg,
                    FoodName: req.body.FoodName,
                    FoodNumber: req.body.FoodNumber,
                    FoodPrice: req.body.FoodPrice,
                    FoodType: req.body.FoodType,
                    desc: req.body.desc
                });
                newFood.save().then(re => {
                    console.log(re)
                    res.json({message: 'success'})
                }).catch(err => {
                    console.log(err)
                    res.json({message: 'error'})
                })
            }
        })


});

Router.post('/getFood', (req, res) => {
    if (req.body.FoodType) {
        Food.find({FoodType: req.body.FoodType})
            .then(food => {
                food.map(item => {
                    item.FoodImg = `${item.FoodImg}`;
                    return {
                        ...item
                    }
                });
                res.json(food)
            })
            .catch(err => {
                console.log(err)
            })
    } else {
        Food.find({})
            .then(food => {
                food.map(item => {
                    item.FoodImg = `${item.FoodImg}`;
                    return {
                        ...item
                    }
                });
                res.json(food)
            })
            .catch(err => {
                console.log(err)
            })
    }

});

Router.post('/remove', (req, res) => {
    Food.remove({_id: req.body._id})
        .then(re => {
            res.json({message: 'success'})
        })
        .catch(err => {
            res.json({message: 'error'})
        })
});

module.exports = Router;