var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var Guest = mongoose.model('Guest');


router.get('/guests', function(req, res, next) {
  Guest.find(function(err, guest){
    if(err){ return next(err); }

    res.json(guest);
  });
});

router.post('/guests/', function(req, res, next) {
  var guest = new Guest(req.body);

  guest.save(function(err, guest){
    if(err){ return next(err); }

    res.json(guest);
  });
});

module.exports = router;
