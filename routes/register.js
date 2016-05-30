'use-strict'
const express = require('express');
const router = express.Router();

// register
router.get('/register', function(req, res) {
  res.render('register');
});

module.exports = router;
