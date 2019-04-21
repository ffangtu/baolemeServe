const express = require('express');
const Router = express.Router();
const Users = require('../../MongoDBModules/user');
const bcrypt = require('bcrypt');

Router.post('/register', (req, res) => {
  Users.findOne({phone: req.body.phone})
    .then((user) => {
      if (user) {
        return res.json({phone: '电话号码已被注册'})
      } else {
        const newUser = Users({
          name: req.body.name,
          phone: req.body.phone,
          password: req.body.password
        });
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(newUser.password, salt, function (err, hash) {
            // Store hash in your password DB.
            if (err) throw err;

            newUser.password = hash;

            newUser.save()
              .then(user => {
                res.json({message: 'success'})
              }).catch(err => {
              res.json({message: 'error'})
            })

          });
        });
        newUser.save()
          .then(re => {
            res.json({type: 'success'})
          })
          .catch(err => {
            res.json({type: 'error'})
          })
      }
    })
});

Router.post('/updata', (req, res) => {
  Users.updateOne({phone: req.body.phone}, {
    name: req.body.name,
    address: req.body.address
  })
    .then(user => {
      res.json({message:'success'})
    })
    .catch(err => {
      res.json({message:'error'});
      console.log(err)
    })
});

Router.post('/login', (req, res) => {
  const password = req.body.password;
  Users.findOne({phone: req.body.phone})
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password)
          .then(match => {
            if (match) {
              res.json(user)
            } else {
              res.json({message: '用户名或密码错误'})
            }
          }).catch(err => {
          res.json({message: 'error'})
        })
      } else {
        res.json({message: '无此用户'})
      }
    })
});

module.exports = Router;