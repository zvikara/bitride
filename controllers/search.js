var Ride = require('../models/Ride');
var User = require('../models/User');

/**
 * POST /search
 * Search for ride
 * @param usertype
 * @param from
 * @param to
 */

exports.postSearch = function(req, res) {
  req.assert('from', 'From cannot be blank').notEmpty();
  req.assert('to', 'To cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/');
  }

  var ridetype = req.body.ridetype;
  driver = (ridetype === 'driver');
  var from = req.body.from;
  var to = req.body.to;

  var ride = new Ride({
    user: req.user,
    name: req.user.profile.name,
    email: req.user.email,
    picture: req.user.profile.picture,
    driver: driver,
    from: req.body.from,
    to: req.body.to
  });

  ride.save(function(err) {
    if (err) {
      req.flash('errors', { msg: 'Cant save drive ' + err });
      return res.redirect('/');
    }
  });

  Ride.find(
    {},
    function(err, rides) {
      if (!err){ 
        console.log(rides);
        req.flash('success', { msg: 'Seaching from ' + ride.from + ' to ' + ride.to  });
        //res.redirect('/');
        res.render('search', {
          title: 'Search',
          //ride: ride,
          rides: rides
        });
      }
    else { throw err;}
    }
  );

  //Ride.find({}).remove().exec();

};
