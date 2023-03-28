var express = require('express');
var router = express.Router();
const fs = require('fs');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/inspiration', function (req, res, next) {
  const inspiration = fs.readFileSync('./views/inspiration.html', { encoding: 'utf8' });
  res.send(inspiration);
});

module.exports = router;
