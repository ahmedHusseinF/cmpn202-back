const jwt = require("jsonwebtoken");
/**
 * Cipherservice Service
 *
 */
class Cipherservice {
  algorithm = sails.config.jwtSettings.algorithm;
  secret = sails.config.jwtSettings.secret;
  issuer = sails.config.jwtSettings.issuer;
  audience = sails.config.jwtSettings.audience;
  expiresInMinutes = sails.config.jwtSettings.expiresInMinutes;

  createToken(user: dynamicObjects) {
    return jwt.sign(
      {
        user
      },
      sails.config.jwtSettings.secret,
      {
        algorithm: this.algorithm,
        expiresIn: this.expiresInMinutes * 60,
        issuer: this.issuer,
        audience: this.audience
      }
    );
  }
}

module.exports = new Cipherservice();
