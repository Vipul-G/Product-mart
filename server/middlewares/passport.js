const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const config = require('../config');
const { getUserByContact, getUserByContactAndPassword } = require('../controllers/auth-controller');

// for login
const localLogin = new LocalStrategy({usernameField: 'contact'}, async (contact, password, done) => {

  const user = await getUserByContactAndPassword(contact, password);
  return user ? done(null, user) : done(null, false, {error: 'Login failed!'});
})


/* Auto Login: This will verify the jwt token coming in header.
If verified user will be attached to the req.*/
const jwtLogin = new JwtStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secretKey
  },
  async (payload, done) => {
    console.log('--->', {payload})
    // const userData = JSON.parse(payload.user)
    // const user = await getUserByContact(userData.contact);
    // return user? done(null, user):done(null, false, {
    //   error: 'Login failed!'
    // });
  }
);

module.exports = passport.use(localLogin).use(jwtLogin);
