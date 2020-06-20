var mongoose = require( 'mongoose');
var tradeMoreInfoSchema = require( './../schema/tradeMoreInfo');

const tradeMoreInfo = mongoose.model('trade_more_info', tradeMoreInfoSchema);
module.exports= tradeMoreInfo;
