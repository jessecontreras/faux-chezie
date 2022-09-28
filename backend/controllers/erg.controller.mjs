/**
 * @file Controller for ERG related backend business logic
 */

//Local dependencies
import { Connection } from "../_helpers/dbConnection.helper.mjs";
//Third party dependencies
import { ObjectId } from "mongodb";
//Export controller so that export statement is only used once
let ergController = {};
//Assign exported members of controller object;
ergController.getAll = getAll;
ergController.create = create;
ergController.deleteErg = deleteErg;
//Enum references to db collections
const FauxChezieCollections = {
  Users: "USERS",
  ERGs: "ERGS",
};
//Enum references to error messages
const ErrorMessages = {
  UserOrPassword: "Incorrect email or password.",
};

/**
 * Gets all ERGs.
 * @returns {Promise<ERG[]| null>} An array of ERG objects or null if db is empty.
 */
async function getAll() {
  try {
    const ergs = await Connection.db
      .collection(FauxChezieCollections.ERGs)
      .find()
      .toArray();
    return ergs;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

/**
 * Creates ERG.
 * @returns {Promise<ERG>} ERG object.
 */
async function create(ergToCreate) {
  try {
    const insertedDoc = await Connection.db
      .collection(FauxChezieCollections.ERGs)
      .findOneAndUpdate(
        ergToCreate,
        { $set: {} },
        {
          upsert: true,
          returnDocument: "after",
        }
      );
    //return the newly inserted document
    const erg = insertedDoc.value;
    return erg;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

/**
 * Deletes specified ERG.
 * @returns {Promise<string>} _id of deleted doc (erg).
 */
async function deleteErg(_id) {
  try {
    const deletedDoc = await Connection.db
      .collection(FauxChezieCollections.ERGs)
      .deleteOne({ _id: ObjectId(_id) });

    return _id;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export { ergController };
