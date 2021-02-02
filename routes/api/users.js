const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
// Load user
const User = require('../../models/User');
// @router  GET /api/users/test
// @desc    test route for users
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @router  POST /api/users/register
// @desc    registration route for users
// @access  Public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ email: 'Email already registered' });
      } else {
        // get avatar for provided email using gravtar -> size 200px, default -> mm
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm',
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password,
        });
        // hashing the password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    })
    .catch((err) => console.log(err));
});

// @router  POST /api/users/login
// @desc    login for users
// @access  Public

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ email: 'User not found!' });
      }
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            //user matched

            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar,
            };
            //sign token
            jwt.sign(
              payload,
              keys.secret,
              { expiresIn: 36000 },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token,
                });
              }
            );
          } else {
            return res.status(400).json({ password: 'password incorrect' });
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});
module.exports = router;
