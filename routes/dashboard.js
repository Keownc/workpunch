'use-strict'
const express = require('express');
const router = express.Router();

// dashboard
router.get('/dashboard', function(req, res) {
  res.render('dashboard');
});

module.exports = router;
