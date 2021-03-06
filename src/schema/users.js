var mongoose = require( 'mongoose');
var uniqueValidator = require( 'mongoose-unique-validator');
var autoIncrement = require( "mongoose-auto-increment");

const usersSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  isActive: {
    type: String,
    default: 'active'
  },
  imgURL: {
    type: Object,
    // default: "../../assets/app/media/img/users/userProfileNew.png"
  },
  account_created: {
    type: Date,
    default: new Date(),
  },
  phone_no: {
    type: String,
  },
  friends: {
    type: Array,

  },
  email: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  trade_info: {
    type: String,
  },
  basicInfo: {
    timezone: {
      type: String,
    },
    show_real_name: {
      type: String,
    },
    disable_sensetive: {
      type: String,
    },
    enable_web_notification: {
      type: String,
    },
    selling_vacation: {
      type: String,
    },
    buying_vacation: {
      type: String,
    },
    send_SMS_new_trade: {
      type: String,
    },
    send_SMS_new_online: {
      type: String,
    },
    introduction: {
      type: String,
    }
  },
  verification: {
    email_verified: {
      type: Boolean,
      default: false,
    },
    mobile_verified: {
      type: Boolean,
      default: false,
    },
  }

});
const sellerSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  payment_method: {
    type: String,
  },
  price_btc: {
    type: Number,
  },
  currency: {
    type: String,
  },
  limit_from: {
    type: Number,
  },
  limit_to: {
    type: Number,
  },
});


const BuyerSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  payment_method: {
    type: String,
  },
  price_btc: {
    type: Number,
  },
  currency: {
    type: String,
  },
  limit_from: {
    type: Number,
  },
  limit_to: {
    type: Number,
  },
});


usersSchema.plugin(uniqueValidator);
// usersSchema.plugin(autoIncrement.plugin, 'id');

module.exports=usersSchema;