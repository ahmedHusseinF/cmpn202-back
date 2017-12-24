class MachineController {
  constructor() {}

  create(req: Request, res: Response) {
    const params = _.extend(req.body, req.params);
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
