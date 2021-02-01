const express = require('express');
const router = express.Router();

// @router  /api/users/test
// @desc    test route for users
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

module.exports = router;
