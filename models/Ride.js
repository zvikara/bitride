var mongoose = require('mongoose');

var rideSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  name: String,
  email: String,
  picture: String,
  driver: Boolean,
  from: String,
  to: String
});

module.exports = mongoose.model('Ride', rideSchema);
