const express = require('express');

const app = express();

const path = require('path');

const mongoose = require('mongoose');

const bodyParser=require('body-parser');

const fs=require('fs');

// 用户路由
const Users=require('./routers/api/users');

const Food=require('./routers/api/food');

const FoodImg=require('./routers/api/foodimg');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// app.use(express.static(path.join(`${__dirname}/../baoleme`, 'dist')));

app.get('/', function (req, res) {
    // res.sendFile(`${__dirname}/../baoleme/dist/index.html`);
    res.send('hi')
});

mongoose.connect('mongodb://localhost:27017/baoleme',{ useNewUrlParser: true })
    .then(re=>{
        console.log('数据库已连接','shujukulianjie')
    }).catch(err=>{
        console.log(err)
});

app.use('/api/users',Users);
app.use('/api/food',Food);
app.use('/api/foodimg',FoodImg);

const port = process.env.PORT || 5000;

const server=app.listen(port, (req,res) => {
    console.log(server.address().address,server.address().port);
    console.log('Serve Running')
});
