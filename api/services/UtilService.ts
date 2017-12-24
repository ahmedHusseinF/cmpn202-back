var uuidv1 = require('uuid/v1')
var dateFormat = require('dateformat');
import { writeFileSync } from 'fs';

/**
 * Utilservice Service
 *
 */
export class Utilservice {
  regularExpression = {
    mobileNumber: /(01)\d{9}/,
    password: /^([0-9]{3,3})(_admin_)([0-9]{3,3})$/,
    numeric: /^-?[0-9]\d*$/,
    positiveNumeric: /^[0-9]\d*$/,
    alphanumeric: /^[a-zA-Z0-9]*$/,
    newPassword: /^(((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    profileName: /^([a-zA-Z])[a-zA-Z_-]*[\w_-]*[\S]$|^([a-zA-Z])[0-9_-]*[\S]$|^[a-zA-Z]*[\S]$/
  };

  /**
     * @description check if that value is unique
     * @param object : object to look for ex: {username: 'adminUsername'}
     * @param modelName : model to select from or table ex : System_users , Banks
     */
  unique(object: any, modelName: string, callback: Function) {
    global[modelName]
      .findOne(object)
      .then((model: any) => {
        if (model) return callback(null, false);

        return callback(null, true);
      })
      .catch((err: Error) => {
        callback(err);
      });
  }

  getValidationErrorMessage(err: any) {
    let message;
    for (let key in err.Errors) {
      message = err.Errors[key];
      break;
    }
    return message;
  }

  /**
     * @description match any regular expression with using the regexName from the regular expression array above
     * @param text
     * @param regexName
     */
  matchRegEx(text: any, regexName: string) {
    if (typeof text != 'string') text = String(text);
    return text.match(this.regularExpression[regexName]) ? true : false;
  }

  /**
     * @description uses the password regular expression above to find if the password matches a certain pattern
     * which from it we know that this that user's first login
     * @param password
     */
  FirstLogin(password: string) {
    return this.matchRegEx(password, 'password');
  }
  alphaNumericAndSPecialCharcter(profileName: string) {
    return this.matchRegEx(profileName, 'profileName');
  }
  isPasswrodValid(password: string) {
    return this.matchRegEx(password, 'newPassword');
  }

  /**
   * @desc generate a time stamped random id for anything !
   */
  generateTrxnReferenceNumber() {
    return uuidv1();
  }

  generateBulkReferenceNumber() {
    return uuidv1()
  }
  /**
     * @description function to check that this string is a number
     */
  checkIsNumber(number: any) {
    return this.matchRegEx(number, 'numeric');
  }

  checkIsMobileNumber(MobileNumber: any) {
    return this.matchRegEx(MobileNumber, 'mobileNumber');
  }

  positiveNumeric(BankCode: any) {
    return this.matchRegEx(BankCode, 'positiveNumeric');
  }

  alphaNumeric(text: any) {
    return this.matchRegEx(text, 'alphanumeric');
  }

  /**
     * @description function to find a value in an array if it exists or not
     * @param array
     * @param value
     */
  contains(array: any, value: any) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == value) {
        return true;
      }
    }
    return false;
  }

  /**
     * @description Getting a random integer between two values, inclusive
     * @param min
     * @param max
     */
  generateRandomNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
     * @description generate a password for the user with patter (3numbers)_admin_(3numbers)
     */
  generateUserPassword(): string {
    let left_num = this.generateRandomNumber(111, 999);
    let right_num = this.generateRandomNumber(111, 999);

    return `${left_num}_admin_${right_num}`;
  }

  ParseUserErrors(errors: any) {
    var validationErrors = [];
    for (var key in errors) {
      if (errors.hasOwnProperty(key)) {
        for (var item in errors[key]) {
          if (errors[key][item].rule !== 'string') {
            validationErrors.push(errors[key][item].message);
          }
        }
      }
    }
    return validationErrors;
  }

  isEmpty(object: dynamicObjects) {
    return Object.keys(object).every((key): boolean => {
      return object[key] === '' || object[key] === null;
    });
  }

  ParseIndicativeErrors(errors: any) {
    let validationErrors: any = {};
    for (let error of errors) {
      console.log(error)
      if (!validationErrors[error.field]) {
        validationErrors[error.field] = [error]
      } else
        validationErrors[error.field].push(error)
    }
    return validationErrors;
  }

  ParseErrors(errors: any) {
    let validationErrors: any = {};

    for (let key in errors) {
      let requiredFlag = false;
      errors[key].forEach((element: any) => {
        if (element.rule == 'required') {
          validationErrors[key] = [element];
          requiredFlag = true;
        }
      });

      if (!requiredFlag) validationErrors[key] = errors[key];
    }

    return validationErrors;
  }

  ParseReqValidateErrors(errors: any, validationErrors: any) {
    let invalidAttributes = errors.invalidAttributes;
    for (let key in invalidAttributes) {
      let requiredFlag = false;
      invalidAttributes[key].forEach((element: any) => {
        if (
          global[errors.model].validationMessages &&
          global[errors.model].validationMessages[key] &&
          global[errors.model].validationMessages[key][element.rule]
        )
          element.message =
            global[errors.model].validationMessages[key][element.rule];
        else element.message = 'invalid filed';

        if (element.rule == 'required') {
          validationErrors[key] = [element];
          requiredFlag = true;
        }
      });
      if (!requiredFlag) validationErrors[key] = invalidAttributes[key];
    }
  }

  generateRequestRefId(): string {
    return uuidv1();
  }

  calacFees(money: string) {
    return 0.02 * Number(money);
  }

  Transactions_reference_number() {
    return Math.random();
  }

  /**
   * @description validate Model -converts callback to promise-
   * @param model
   * @param data
  */
  validateModel(model: any, data: any) {
    return new Promise(resolve => {
      model.validate(data, (err: any) => resolve(err));
    });
  }

  TransformSpaceToUnderscore(text: string) {
    let allLower = text.toLowerCase();
    return allLower.split(' ').join('_');
  }

  /* log(message: any | Error, database = true) {
    console.log(message);

    if (!database) return;

    if (message instanceof Error) {
      Error_log.create({
        name: message.name,
        message: message.message,
        stack: message.stack
      }).then((log: Error_log) => {
        return;
      });
    }

    if (typeof message == 'string')
      Error_log.create({
        message: message
      }).then((log: Error_log) => {
        return;
      });
  } */

  toSqlDate(date: any) {
    date =
      date.getUTCFullYear() +
      '-' +
      ('00' + (date.getUTCMonth() + 1)).slice(-2) +
      '-' +
      ('00' + date.getUTCDate()).slice(-2) +
      ' ' +
      ('00' + date.getUTCHours()).slice(-2) +
      ':' +
      ('00' + date.getUTCMinutes()).slice(-2) +
      ':' +
      ('00' + date.getUTCSeconds()).slice(-2);

    return date;
  }

  validateEmail(email: string) {
    return !this.matchRegEx(email, 'email');
  }

  getDateToday() {
    return new Date().toISOString()
  }

  getFilenameFromPath(path: string, withExtension = false) {
    let paths = path.split('/');
    let filename = paths[paths.length - 1];

    if (withExtension)
      return filename;

    return filename.slice(0, filename.length - 3);
  }

  async tahweelResp(_class:any,params?:object){
    let tahweel_resp = await _class.makeRequest(params);
    let response = tahweel_resp.response
    let code = response.ResponseCode._text;
    let description = response.ResponseDescription._text;
    console.log('resp',response)
    console.log('tahweel resp: ',{ code:code,message:description});
    return code === '00000' ? 
      {ok:true,message:description,response:response}:
      {ok:false,status:code,message:description}
  }

  msisdn(mobile_number:string){
    return '002' + mobile_number;
  }

}

module.exports = new Utilservice();
