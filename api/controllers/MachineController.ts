const indicative = require("indicative");

class MachineController {
  constructor() {}

  create(req: Request, res: Response) {
    try {
      const params = _.extend(req.body, req.params);

      const machine = {
        ManufDuration: params.ManufDuration,
        MachName: params.MachName,
        AssembledBy: params.AssembledBy,
        AssembledOn: params.AssembledOn,
        MachSize: params.MachSize,
        MachWeight: params.MachWeight,
        MachProductivity: params.MachProductivity,
        MachPrice: params.MachPrice,
        MachAvailability: params.MachAvailability,
        FactoryID: params.FactoryID,
        MachType: params.MachType
      };

      const machineType = {
        TypeName: params.MachType
      };

      const typeRules = {
        TypeName: "required|string"
      };

      const machRules = {
        ManufDuration: "string",
        MachName: "required|string",
        AssembledBy: "required|string",
        AssembledOn: "string",
        MachSize: "required|string",
        MachWeight: "required|string",
        MachProductivity: "required|string",
        MachPrice: "required|string",
        MachAvailability: "required|string",
        FactoryID: "required|integer",
        MachType: "required|string"
      };

      indicative
        .validateAll(
          _.extend(machine, machineType),
          _.extend(machRules, typeRules)
        )
        .then(() => {
          mysqlConnection.beginTransaction(err => {
            if (err) {
              throw err;
            }
            mysqlConnection.query(
              `insert into MachineType set ?`,
              machineType,
              (err, resType) => {
                if (err) {
                  mysqlConnection.rollback(() => {
                    throw err;
                  });
                }
                mysqlConnection.query(
                  `insert into Machine set ?`,
                  machine,
                  (err, resMach) => {
                    mysqlConnection.commit(err => {
                      if (err) {
                        mysqlConnection.rollback(() => {
                          throw err;
                        });
                      }

                      return res.status(200).send({
                        message: "Machine Created Successfully"
                      });
                    });
                  }
                );
              }
            );
          });
        })
        .catch(err => {
          return res.status(422).send(err);
        });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        error: `Internal Server Error`
      });
    }
  }

  getALlFactoryIDs(req: Request, res: Response) {
    try {
      //console.log("saw a factory req");
      mysqlConnection.query(
        `select FactoryID, FName from Factory`,
        (err, results) => {
          if (err) {
            throw err;
          }

          return res.status(200).send({
            results
          });
        }
      );
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error });
    }
  }
}

module.exports = new MachineController();
