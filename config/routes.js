const webBaseUrl = "/api/v1/web";

let routes = {
  /**
   *  login routes
   *
   */
  [`post ${webBaseUrl}/user/login`]: "Authcontroller.login",

  /**
   * user entity routes
   */
  [`post ${webBaseUrl}/user/checkNationalID`]: "UsersController.checkNatID",
  [`post ${webBaseUrl}/user/customer/create`]: "UsersController.createCustomer",
  [`post ${webBaseUrl}/user/staff/create`]: "UsersController.createStaff",
  [`post ${webBaseUrl}/getAllFactories`]: "MachineController.getALlFactoryIDs",
  [`post ${webBaseUrl}/machine/create`]: "MachineController.create",
  "post /test": "TestController.test"
};

module.exports.routes = routes;
