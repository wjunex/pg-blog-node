const express = require('express');
const router = express.Router();
const pool = require('./../sql/index.js')
const Response = require('./response');

// 查询博客列表
router.get('/getBlogList', function (req, res, next) {
  // 从请求参数中获取页码和每页数据量
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  // 计算查询起始位置
  const start = (page - 1) * pageSize;

  // 查询博客列表数据
  pool.query('SELECT * FROM bloglist LIMIT ?, ?', [start, pageSize], (err, results) => {
    if (err) {
      // 发生错误，返回错误响应
      const response = new Response(500, 'Error', err);
      res.json(response);
      return;
    }

    // 查询博客总数
    pool.query('SELECT COUNT(*) as total FROM bloglist', (err, countResult) => {
      if (err) {
        // 发生错误，返回错误响应
        const response = new Response(500, 'Error', err);
        res.json(response);
        return;
      }

      // 获取博客总数
      const total = countResult[0].total;

      // 创建响应对象
      const response = new Response(200, 'Success', {
        list: results,
        total: total
      });

      // 发送响应
      res.json(response);
    });
  });
});

// 新增博客
router.post('/addBlog', (req, res) => {
  // 从请求体中获取文章数据
  const { title, content, summary, cover, tags, category, is_public, is_draft } = req.body;

  // 构建 SQL 查询语句
  const sql = `INSERT INTO bloglist (blog_title, content, summary, cover, tags, category, is_public, is_draft) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  // 执行 SQL 查询语句，并将文章数据插入到表中
  pool.query(sql, [title, content, summary, cover, tags, category, is_public, is_draft], (error, results) => {
    if (error) {
      // 如果出错，返回错误信息给前端
      const response = new Response(500, 'Error', err);
      res.json(response);
    } else {
      // 如果成功，返回成功信息给前端
      const response = new Response(200, 'Success', results);
      res.json(response);
    }
  });
});





module.exports = router;
