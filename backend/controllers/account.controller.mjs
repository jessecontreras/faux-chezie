/**
 * @file Controller for account related backend business logic
 */

//Local dependencies
import { Connection } from "../_helpers/dbConnection.helper.mjs";
import { tokenHelper } from "../_helpers/token.helper.mjs";
//Third party dependencies
import * as bcrypt from "bcrypt";
//Export controller so that export statement is only used once
let accountController = {};
//Assign exported members of controller object;
accountController.authenticate = authenticate;
//Enum references to db collections -  we don't use strings to reference collections.
const FauxChezieCollections = {
  Users: "USERS",
};
//Enum references to error messages
const ErrorMessages = {
  UserOrPassword: "Incorrect email or password.",
};

/**
 * Authenticates user.
 *
 * @param {string} user In this instance a user's email.
 * @returns {Promise<User|Object>} A User Object or an error message.
 */
async function authenticate(username, password) {
  try {
    let user = await Connection.db
      .collection(FauxChezieCollections.Users)
      .findOne({
        username: username.toLowerCase(),
      });
    //return error message if user does not exist.
    if (!user) {
      return {
        error: ErrorMessages.UserOrPassword,
      };
    }
    if (user && bcrypt.compareSync(password, user.hash)) {
      console.log();
      const jwtToken = await tokenHelper.generateJwtToken(user._id);
      //create a frontend user object, without user hash, with updated id value reference, and with token property.
      const normalizedUser = {
        id: user._id,
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        token: jwtToken,
      };

      return normalizedUser;
    } else {
      return {
        error: ErrorMessages.UserOrPassword,
      };
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export { accountController };
