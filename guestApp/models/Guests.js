var mongoose = require('mongoose');

var GuestSchema = new mongoose.Schema({
  name_first: { type: String, required: true },
  name_last: { type: String, required: true },
  phone: String,
  email: String, 
  song: String,
  food: String,
  msg: String,
  isAttending: { type: Boolean, required: true }
});

mongoose.model('Guest', GuestSchema);