var express = require('express');
var router = express.Router();
var connection = require('./../sql/index.js')



// 增加分类
router.post('/addCategory', function (req, res, next) {
    let create_date = new Date(Date.now() + (8 * 60 * 60 * 1000));
    console.log(create_date)
    connection.query('INSERT INTO pgblog.category(name,create_date) VALUE(?,?)',[req.body.name,create_date], function (err, rows, fields) {
        console.log(err)
        if (err) {
            res.send({code:0,message:'操作失败'})
        } else {
            res.send({code:1,message:'操作成功'})
        }
    })
})

// 删除分类
router.get('/delCategory', function(req, res, next) {
    connection.query('DELETE FROM pgblog.category WHERE id=?',[req.query.id], function (err, rows, fields) {
        if (err) {
            res.send({code:0,data:err, message:'操作失败'})
        } else {
            res.send({code:1,message:'操作成功'})
        }
    })
});

// 修改分类
router.post('/updateCategory', function (req, res, next) {
    connection.query('UPDATE pgblog.category SET name=? WHERE id=?',[req.body.name,req.body.id], function (err, rows, fields) {
        if (err) {
            res.send({code:0,message:'操作失败'})
        } else {
            res.send({code:1,message:'操作成功'})
        }
    })
})

// 查询分类列表
router.get('/getCategoryList', function(req, res, next) {
    connection.query('SELECT * FROM pgblog.category', function (err, rows, fields) {
        res.send({code:1,data:rows,message:'请求成功'});
    })
});


module.exports = router;
