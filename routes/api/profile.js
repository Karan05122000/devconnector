const express = require('express');
const router = express.Router();

// @router  /api/profile/test
// @desc    test route for profile
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

module.exports = router;
