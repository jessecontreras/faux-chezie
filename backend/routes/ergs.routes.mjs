/**
 * @file Handles all ERG routes
 */

//Third party dependencies
import express from "express";
//Local dependencies
import { ergController } from "../controllers/erg.controller.mjs";
import { tokenHelper } from "../_helpers/token.helper.mjs";

const router = express.Router();

//Define routes
router.get("/", tokenHelper.verifyToken, getAll);
router.post("/", tokenHelper.verifyToken, createErg);
router.delete("/:_id", tokenHelper.verifyToken, _delete);

/**
 *  Route to get all ERGs
 * @param {object} req - express req object.
 * @param {object} res - express res object.
 */
async function getAll(req, res) {
  try {
    const ergs = await ergController.getAll();
    res.send(ergs);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

/**
 * Route to create ERG
 * @param {object} req - express req object.
 * @param {object} res - express res object.
 */
async function createErg(req, res) {
  try {
    const updatedErg = await ergController.create(req.body.erg);
    res.send(updatedErg);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

/**
 * Route to delete ERG.
 * @param {object} req - express req object.
 * @param {object} res - express res object.
 */
async function _delete(req, res) {
  try {
    const deletedDocId = await ergController.deleteErg(req.params._id);
    res.send({ _id: deletedDocId });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

//Export router
export { router as ergsRoute };
