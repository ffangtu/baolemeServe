const express = require('express');

const app = express();

const io = require('socket.io')();

const path = require('path');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');


// 用户路由
const Users = require('./routers/api/users');

const Food = require('./routers/api/food');

const FoodImg = require('./routers/api/foodimg');

const Order = require('./routers/api/order');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 静态资源目录设置
app.use(express.static(path.join(`${__dirname}/../baoleme`, 'dist')));
app.use('/Img', express.static("Img"));

app.get('/', function (req, res) {
    res.sendFile(`${__dirname}/../baoleme/dist/index.html`);
});

app.get('/chat', function (req, res) {
    try {
        res.sendFile(`${__dirname}/../chat/dist/index.html`);
    } catch (e) {
        res.json({text:'errpr'})
    }
});

mongoose.connect('mongodb://47.98.47.228:27017/baoleme', {useNewUrlParser: true})
    .then(re => {
        console.log('数据库已连接', 'shujukulianjie')
    }).catch(err => {
    console.log(err)
});

app.use('/api/users', Users);
app.use('/api/food', Food);
app.use('/api/foodimg', FoodImg);
app.use('/api/order',Order);

const port = process.env.PORT || 5000;

const server = app.listen(port, (req, res) => {
    console.log('Serve Running')
});
