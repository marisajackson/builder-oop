'use strict';

// var users = global.nss.db.collection('users');
// var Mongo = require('mongodb');
// var _ = require('lodash');

class Item {
  constructor(type){
    this.type = type;
    switch(type){
      case 'autogrow':
        this.cost = 50000;
        this.image = '/img/autogrow.png';
        break;
    }
  }
}

module.exports = Item;
