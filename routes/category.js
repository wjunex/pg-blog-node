var express = require('express');
var router = express.Router();
var connection = require('./../sql/index.js')

router.get('/getCategoryList', function(req, res, next) {
    connection.query('SELECT * FROM pgblog.category', function (err, rows, fields) {
        if (err) throw err
        res.send({code:200,data:rows,message:'请求成功'});
    })
});

module.exports = router;
