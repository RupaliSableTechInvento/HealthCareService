var usersModel= require('./../models/usersModel');
var tokenModel= require('./../models/tokenModel');
var jwt= require('jsonwebtoken');
var env =require("../env");
var tradeModel= require('../models/postatrade');
var encode = require('hashcode').hashCode;

var express =require('express');
const app = express();

// var http = require('http')(9004);
// global = {};

const authController = {
  login: (req, res, next) => {
    req.body.password = encode().value(req.body.password);
    const credential = req.body;
    global.email = credential.email;
    usersModel.findOne({
      email: credential.email,
      password: credential.password
    }, (err, user) => {
      if (err) res.json(err);
      if (user !== null) {
        console.log("User=>", user)
        var d = new Date();
        var v = new Date();
        v.setMinutes(d.getMinutes() + 10);
        const token1 = jwt.sign({
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          expiry: v
        }, env.App_key);
        let token = new tokenModel();
        console.log(user.email);
        var currentTime = new Date();
        var token2 = {
          'token': token1,
          email: user.email,
          isActive: "active",
          expiry: v,
          userActiveTime: currentTime
        };
        tokenModel.findOneAndUpdate({
          $and: [{
            email: user.email
          }, {
            isActive: "active"
          }]
        }, {
          $set: {
            isActive: "inactive"
          }
        }, (err, data) => {
          if (err) return res.json({
            isError: true,
            data: err
          });
          else {
            tokenModel.create(token2, function(err, token) {
              if (err) return res.json(err);
              res.json({
                isError: false,
                data: token1,
                user: {
                  first_name: user.first_name,
                  last_name: user.last_name,
                  id: user._id
                }
              });
            })
          }
        })
      } else {
        res.json({
          isError: true,
          data: "email or password incorrect !"
        })
      }
    });
  },

  getActiveUser: async(req, res, next) => {
    await tokenModel.find({
      isActive: "active"
    }, (err, tokenModel) => {
      if (err) return res.json({
        isError: true,
        tokenModel: err
      });
      else {
        var emailObj = [];
        console.log("trade model result", tokenModel.length);
        for (let index = 0; index < tokenModel.length; index++) {
          emailObj.push(tokenModel[index].email);
        }
        console.log("active user email ", emailObj);

        usersModel.find({
          'email': {
            $in: emailObj
          }
        }, (err, user) => {
          if (err) return res.json({
            isError: true,
            user: err
          });
          else {
            return res.json({
              isError: false,
              tokenModel: tokenModel,
              user: user
            });
          }
        });
      }
    })
  },

  register: (req, res, next) => {
    console.log("req.body for register", req.body)
    var account_created = new Date();
    if (req.body.password != "" && req.body.password.length > 6) {
      req.body.password = encode().value(req.body.password);
      let user = new usersModel(req.body);
      req.body.account_created = account_created;

      console.log("Account Created==>", account_created);
      user.save(req.body, function(err, user) {
        if (err) return res.json(err);
        res.json(user)
      })
    } else {
      res.json("Please provide valid password");
    }
  },
  logout: (req, res, next) => {
    var decoded = jwt.verify(req.headers['authorization'], env.App_key);
    tokenModel.findOneAndUpdate({
      $and: [{
        'email': decoded.email
      }, {
        'isActive': 'active'
      }, {
        'token': req.headers['authorization']
      }]
    }, {
      $set: {
        'isActive': 'inactive',
        'userInactiveTime': new Date()
      }
    }, (err, data) => {
      if (err) {
        res.json({
          success: false,
          data: err
        });
      } else {
        res.json({
          success: true,
          data: data
        });
      }
    })
  },
};

module.exports=authController;