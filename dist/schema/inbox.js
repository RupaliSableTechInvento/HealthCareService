var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var autoIncrement = require("mongoose-auto-increment");

const inbox = new mongoose.Schema({

  from: {
    type: String
  },
  to: {
    type: Array
  },
  sent: {
    type: Date
  },
  msg: {
    type: String
  }
});

inbox.plugin(uniqueValidator);

module.exports = inbox;
//# sourceMappingURL=inbox.js.map