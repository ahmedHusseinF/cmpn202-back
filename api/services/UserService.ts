import * as console from 'console';
let constants = require('./ConstantService');
import { RoleManager } from '../ourServices/RoleManager';

/**
 * UserService Service
 *
 */
export class Userservice {
  roleManager: RoleManager;

  constructor() {
    this.roleManager = new RoleManager();
  }

  organizationTypeToRoleName = {
    [constants.BANKS]: 'Bank',
    [constants.SCHEMES]: 'Scheme'
  };

  /**
   * @description return the user object
   */
  getLoggedUserObject() {
    if (req.user.hasOwnProperty('organization_type'))
      req.user.objectType = ConstantService.SYSTEM_USER;
    else req.user.objectType = ConstantService.WALLET_USER;

    return req.user;
  }

  getLoggedUserType() {
    let currentLoggedInUser = this.getLoggedUserObject();
    
    if (currentLoggedInUser.hasOwnProperty('organization_type'))
      return ConstantService.SYSTEM_USER;

    if (currentLoggedInUser.type === 'customer')
      return ConstantService.CONSUMER;

    return ConstantService.MERCHANT;

  }

  /**
   * @description return currently logged in user role id
   */
  getLoggedUserRoleIdc(): number {
    return req.user.role.id;
  }

  /**
   * @description return currently logged in user id
   */
  getLoggedUserId(): number {
    return req.user.id;
  }

}

module.exports = new Userservice();
