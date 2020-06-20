var mongoose = require( 'mongoose');
var uniqueValidator = require( 'mongoose-unique-validator');
var autoIncrement = require( "mongoose-auto-increment");

const tradeMoreInfoSchema = new mongoose.Schema({
  trade_id:{
    type:String,
  },
  user_id:{
    type:String,
  }
});

tradeMoreInfoSchema.plugin(uniqueValidator);


module.exports=tradeMoreInfoSchema;
