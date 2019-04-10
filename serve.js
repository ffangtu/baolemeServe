const express = require('express');

const app = express();

const mongoose = require('mongoose');

const bodyParser=require('body-parser');

// 用户路由
const Users=require('./routers/api/users')
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('hi')
});

mongoose.connect('mongodb://localhost:27017/baoleme',{ useNewUrlParser: true })
    .then(re=>{
        console.log('数据库已连接')
    }).catch(err=>{
        console.log(err)
});

app.use('/api/users',Users)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Serve Running')
});
