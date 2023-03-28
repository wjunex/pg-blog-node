const express = require('express');
const router = express.Router();
const pool = require('./../sql/index.js')
const Response = require('./response');

router.get('/getInspirationList', function (req, res, next) {
  pool.query('SELECT * FROM inspiration ORDER BY created_at DESC', (err, results) => {
    if (err) {
      // 发生错误，返回错误响应
      const response = new Response(500, 'Error', err);
      res.json(response);
      return;
    }
    // 创建响应对象
    const response = new Response(200, 'Success', results);
    // 发送响应
    res.json(response);
  });
});


router.post('/addInspiration', (req, res) => {
  const { content } = req.body;
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  console.log(currentDate);

  const query = `INSERT INTO inspiration (content, created_at) VALUES (?, ?)`;

  pool.query(query, [content, currentDate], (error, results, fields) => {
    if (error) {
      const response = new Response(500, 'Error', error);
      res.json(response);
      return;
    }
    const response = new Response(200, 'Success', results);
    res.json(response);
  });
});

router.put('/updateInspiration/:id', (req, res) => {
  const { content } = req.body;
  const { id } = req.params;
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const query = `UPDATE inspiration SET content = ?, created_at = ? WHERE id = ?`;

  pool.query(query, [content, currentDate, id], (error, results, fields) => {
    if (error) {
      const response = new Response(500, 'Error', error);
      res.json(response);
      return;
    }
    const response = new Response(200, 'Success', results);
    res.json(response);
  });
});

router.delete('/deleteInspiration/:id', (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM inspiration WHERE id = ?`;

  pool.query(query, [id], (error, results, fields) => {
    if (error) {
      const response = new Response(500, 'Error', error);
      res.json(response);
      return;
    }
    const response = new Response(200, 'Success', results);
    res.json(response);
  });
});





module.exports = router;
