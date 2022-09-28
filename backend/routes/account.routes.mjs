/**
 * @file Handles all account routes
 */

//Third party dependencies
import express from "express";
//Local dependencies
import { accountController } from "../controllers/account.controller.mjs";
const router = express.Router();

//Define routes
router.post("/authentication", authentication);

/**
 * Route to authenticate user
 * @param {object} req expressjs req object - contains user email
 * @param {object} res expressjs res object - containes server response
 */
async function authentication(req, res) {
  try {
    console.log("Made it to authentication");
    const authResponse = await accountController.authenticate(
      req.body.email,
      req.body.password
    );

    res.send(authResponse);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

//Export router
export { router as accountRoute };
