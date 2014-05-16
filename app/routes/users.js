'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');
var Item = traceur.require(__dirname + '/../models/item.js');

exports.login = (req, res)=>{
  User.login(req.body.username, user => {
    res.render('users/dashboard', {user:user});
  });
};

exports.dashboard = (req, res)=>{
  User.findByUserId(req.query.userId, user=>{
    res.render('users/dashboard', {user:user});
  });
};

exports.sell = (req, res)=>{
  var amount = req.body.amount * 1;
  User.findByUserId(req.params.userId, user=>{
    if(user.wood >= amount){
      user.wood -= amount;
      user.cash += amount/5;
      user.save(()=>{
        res.render('users/dashboard', {user:user});
      });
    }
  });
};

exports.purchase = (req, res)=>{
  User.findByUserId(req.params.userId, user=>{
    var item = new Item(req.params.item);
    user.purchase(item);
    user.save(()=>{
      res.render('users/dashboard', {user:user});
    });
  });
};
