const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
// Post model
const Post = require('../../models/Posts');
// Profile model
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validation/posts');

// @router  /api/posts/test
// @desc    test route for posts
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ nopostsfound: 'No posts found' }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({ nopostfound: 'No post found with that ID' })
    );
});

module.exports = router;
