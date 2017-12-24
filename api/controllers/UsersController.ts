import { MysqlError } from "mysql";
const bcrypt = require("bcryptjs");
const indicative = require("indicative");

class UsersController {
  checkNatID(req: Request, res: Response) {
    try {
      const natID: any = req.body.nationalID;

      //console.log(isNaN(natID));
      if (isNaN(natID) || natID.length !== 14)
        return res.status(422).send({
          error: `please send a proper national id`
        });

      mysqlConnection.query(
        `SELECT * from Users Where NationalID = '${natID}'`,
        (err, results) => {
          if (err) throw err;

          if (results.length)
            return res.status(400).send({
              userNotExist: false
            });

          return res.status(200).send({
            userNotExist: true
          });
        }
      );
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        error: `Internal Server Error`
      });
    }
  }

  createCustomer(req: Request, res: Response) {
    try {
      const params = _.extend(req.body, req.params);

      const rules = {
        Email: "required|email",
        Password: "required|min:6|max:20",
        NationalID: "required|regex:^[0-9]+$",
        FirstName: "required|alpha",
        MiddleName: "required|alpha",
        LastName: "required|alpha",
        OrgName: "required|alpha",
        OrgAddress: "required|string",
        OrgTelNo: "string|regex:^[0-9]+$",
        Specialization: "required|string",
        City: "string",
        Governorate: "string",
        Street: "string",
        Building: "string",
        MobileNumber: "required|min:11|max:11",
        TelNo: "regex:^[0-9]+$"
      };

      const messeges = {};

      indicative
        .validateAll(params, rules)
        .then(() => {
          bcrypt.hash(params.Password, 10, (err: Error, hash: string) => {
            if (err) {
              throw err;
            }

            params.Password = hash;

            const organization = {
              OrgAddress: params.OrgAddress,
              OrgName: params.OrgName,
              OrgTelNo: params.OrgTelNo
            };

            const user = {
              FirstName: params.FirstName,
              MiddleName: params.MiddleName,
              LastName: params.LastName,
              NationalID: params.NationalID,
              Email: params.Email,
              City: params.City,
              Governorate: params.Governorate,
              Street: params.Street,
              Password: params.Password,
              TelNo: params.TelNo,
              MobileNumber: params.MobileNumber
            };

            const customer = {
              Specialization: params.Specialization,
              UserId: params.NationalID,
              Organization: ""
            };

            mysqlConnection.beginTransaction(err => {
              if (err) {
                throw err;
              }

              mysqlConnection.query(
                `insert into Organization set ?`,
                organization,
                (err, resOrg) => {
                  if (err) {
                    return mysqlConnection.rollback(() => {
                      throw err;
                    });
                  }
                  //console.log(resOrg, "1st query");

                  mysqlConnection.query(
                    `insert into Users set ?`,
                    user,
                    (err, resUser) => {
                      if (err) {
                        return mysqlConnection.rollback(() => {
                          throw err;
                        });
                      }

                      customer.Organization = resOrg.insertId;

                      //console.log(resUser, "2nd query");
                      mysqlConnection.query(
                        `insert into Customers set ?`,
                        customer,
                        (err, resCustomer) => {
                          if (err) {
                            return mysqlConnection.rollback(() => {
                              throw err;
                            });
                          }

                          //console.log(resCustomer, "3rd query");
                          mysqlConnection.commit(err => {
                            if (err) {
                              return mysqlConnection.rollback(() => {
                                throw err;
                              });
                            }

                            return res.status(200).send({
                              message: `Customer Created Successfully`
                            });
                          });
                        }
                      );
                    }
                  );
                }
              );
            });
          });
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(422).send({
            error
          });
        });
    } catch (errorCatched) {
      console.error(errorCatched);
      return res.status(500).send({
        error: errorCatched
      });
    }
  }

  createStaff(req: Request, res: Response) {
    try {
      const params = _.extend(req.body, req.params);

      const rules = {
        Email: "required|email",
        Password: "required|min:6|max:20",
        NationalID: "required|regex:^[0-9]+$",
        FirstName: "required|alpha",
        MiddleName: "required|alpha",
        LastName: "required|alpha",
        Occupation: "required|string",
        FactoryID: "required|regex:^[0-9]+$",
        City: "string",
        Governorate: "string",
        Street: "string",
        Building: "string",
        MobileNumber: "required|min:11|max:11|regex:^[0-9]+$",
        TelNo: "regex:^[0-9]+$"
      };

      indicative
        .validateAll(params, rules)
        .then(() => {
          bcrypt.hash(params.Password, 10, (err: Error, hash: string) => {
            if (err) {
              throw err;
            }

            params.Password = hash;

            const user = {
              FirstName: params.FirstName,
              MiddleName: params.MiddleName,
              LastName: params.LastName,
              NationalID: params.NationalID,
              Email: params.Email,
              City: params.City,
              Governorate: params.Governorate,
              Street: params.Street,
              Password: params.Password,
              TelNo: params.TelNo,
              MobileNumber: params.MobileNumber
            };

            const staff = {
              Occupation: params.Occupation,
              StaffID: params.NationalID,
              FactoryID: params.FactoryID
            };

            mysqlConnection.beginTransaction(err => {
              if (err) {
                throw err;
              }

              mysqlConnection.query(
                `insert into Users set ?`,
                user,
                (err, resUser) => {
                  if (err) {
                    return mysqlConnection.rollback(() => {
                      throw err;
                    });
                  }

                  console.log(resUser, "1st query");
                  mysqlConnection.query(
                    `insert into Staff set ?`,
                    staff,
                    (err, resStaff) => {
                      if (err) {
                        return mysqlConnection.rollback(() => {
                          throw err;
                        });
                      }

                      console.log(resStaff, "2nd query");
                      mysqlConnection.commit(err => {
                        if (err) {
                          return mysqlConnection.rollback(() => {
                            throw err;
                          });
                        }

                        return res.status(200).send({
                          message: `Staff Created Successfully`
                        });
                      });
                    }
                  );
                }
              );
            });
          });
        })
        .catch((error: Error) => {
          console.log(error);
          return res.status(422).send({
            error
          });
        });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error });
    }
  }
}

module.exports = new UsersController();
