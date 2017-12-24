const util = require("util");
/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
  _.extend(sails.hooks.http.app.locals, sails.config.http.locals);

  // Changing the timezone of sails
  process.env.TZ = "UTC+2";

  // mysql intialization across all controllers and services

  const mysql = require("mysql");

  const cfg = require("./../config/local");
  global.mysqlConnection = mysql.createConnection(
    cfg.connections.mysql_connection
  );

  mysqlConnection.connect(err => {
    if (err) throw err;

    sails.log.debug(`MySQL is Connected`);
  });

  process.on("unhandledException", err => {
    mysqlConnection.query(
      `insert into ErrorLog set Error = '${err.message}, Stack='${err.stack}''`,
      (err, results) => {
        if (err) {
          console.error(`err within err, thats errception`, err);
        }
        console.log("err evaded");
      }
    );
  });

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  return cb();
};
