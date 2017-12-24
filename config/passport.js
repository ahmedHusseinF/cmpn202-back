var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var local = require('./local');
let jwtFromRequest = require('passport-jwt').ExtractJwt.fromAuthHeader();

var JWT_STRATEGY_CONFIG = {
  secretOrKey: local.jwtSettings.secret,
  jwtFromRequest: jwtFromRequest,
  issuer: '',
  audience: '',
  passReqToCallback: false
};

var _onJwtStrategyAuth = (payload, next) => {
  let user = payload.user;
  return next(null, user, {});
};

passport.use(new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth));

module.exports.jwtSettings = {
  // secret:'' // secret here loaded from local.js
  expiresInMinutes: 60 * 24,
  algorithm: 'HS256',
  issuer: 'ahmedHussein',
  audience: 'ahmedHussein'
};
