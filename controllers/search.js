/**
 * POST /search
 * Search for ride
 * @param usertype
 * @param from
 * @param to
 */

exports.postSearch = function(req, res) {
  req.assert('from', 'From cannot be blank').notEmpty();
  //req.assert('to', 'To cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/');
  }

  var usertype = req.body.usertype;
  var from = req.body.from;
  var to = req.body.to;

  req.flash('success', { msg: 'Seaching from ' + from + ' to ' + to  });
  res.redirect('/');
};
