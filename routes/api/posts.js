const express = require('express');
const router = express.Router();

// @router  /api/posts/test
// @desc    test route for posts
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

module.exports = router;
