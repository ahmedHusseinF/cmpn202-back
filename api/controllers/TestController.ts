class TestController {
  test(req: Request, res: Response){
    mysqlConnection.connect();
    mysqlConnection.query(`SELECT * from user`,(err, results, fields) =>{
      if(err) console.error(err);

      mysqlConnection.end();
      return res.send(results)
    })
  }
}

module.exports = new TestController();