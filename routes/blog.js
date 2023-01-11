var express = require('express');
var router = express.Router();
var connection = require('./../sql/index.js')

router.get('/getBlogList', function(req, res, next) {
    let page = req.query.page || 1;
    let pageSize = req.query.pageSize || 6;
    let total = 0;
    let sql = 'SELECT * FROM pgblog.bloglist limit ' + (page - 1 ) * pageSize +',' + pageSize;

    connection.query('SELECT * FROM pgblog.bloglist', function (err, rows, fields) {
        if (err) throw err
       total = rows.length
    })

    connection.query(sql, function (err, rows, fields) {
        if (err) throw err
        res.send({code:1,data:rows,total:total,message:'请求成功'});
    })
});

module.exports = router;
