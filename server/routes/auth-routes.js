const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const authController = require('../controllers/auth-controller');
const passport = require('../middlewares/passport');
const checkAuth = require('../middlewares/check-auth');

// localhost:3000/api/auth
router.post('/register', asyncHandler(register));
router.post('/login', passport.authenticate('local', {session: false}), login);
router.get('/findme', checkAuth, autoLogin);

async function register(req, res, next) {
  const user = req.body;
  console.log('registering user', user);
  req.user = await authController.insert(user);
  delete user.hashedPassword;
  res.status(201).json(user)
}
function login(req, res) {
  const user = req.user;
  const tokenObj = authController.generateToken(user);
  res.json({user, token: tokenObj.token, expiresIn: tokenObj.expires});
}
function autoLogin(req, res) {
  res.status(200).json(req.user)
}

module.exports = router;

