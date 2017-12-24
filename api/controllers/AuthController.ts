const bcrypt = require("bcrypt");
const util = require("util");
/**
 * AuthController
 *
 */
class AuthController {
  user: any;
  isFirst: boolean = true;

  constructor() {}

  async login(req: Request, res: Response) {
    var email = req.body.email;
    var password = req.body.password;

    //username = username.toLowerCase();

    if (!email || !password)
      return res.status(400).send({ message: "missing paramter" });

    try {
      //const query = util.promisify(mysqlConnection.query);

      mysqlConnection.query(
        `SELECT * 
         From Users
         WHERE Email = '${email}'`,
        (err, results) => {
          if (err) {
            throw err;
          }

          if (!results.length)
            return res.status(400).send({
              error: `No User is attached to this Email`
            });

          this.user = results[0];
          //console.log(password, this.user.Password);
          bcrypt.compare(
            password,
            this.user.Password,
            (err: Error, isMatch: boolean) => {
              if (err) {
                throw err;
              }

              if (!isMatch)
                return res
                  .status(400)
                  .send({ message: `Passwords doesn't match` });

              let responseObject = {
                token: CipherService.createToken(this.user),
                message: "logged in successfully",
                username: `${this.user.FirstName} ${this.user.MiddleName} ${
                  this.user.LastName
                }`
              };

              //console.log(results);
              return res.status(200).send(responseObject);
            }
          );
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: "Something Went Wrong" });
    }
  }
}

module.exports = new AuthController();
