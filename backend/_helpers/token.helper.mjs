/**
 * @file Helper for jwt token generation
 */

//Third party dependencies
import jwt from "jsonwebtoken";
const { sign, verify } = jwt;
//Token helper object to export
let tokenHelper = {};
//Assign exported members of controller object;
tokenHelper.generateJwtToken = generateJwtToken;
tokenHelper.verifyToken = verifyToken;

/**
 * Creates a jwt token that expires in 24 hours.
 * @param {string} userId FauxChezie user id.
 * @returns {Promise<jwt>} A signed jwt token.
 */
async function generateJwtToken(userId) {
  try {
    return sign({ sub: userId }, process.env.HOLA_MUNDO_SECRETO, {
      expiresIn: "24h",
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

/**
 *  Verify jwt token.
 * @param {object} req req express object.
 * @param {object} res res express object.
 * @param {object} next next express object.
 * @returns {Promise<object>} Passes middleware to next function or responds with an error.
 */
async function verifyToken(req, res, next) {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = verify(token, process.env.HOLA_MUNDO_SECRETO);
      if (decoded) next();
    } else if (req.query && req.query.token) {
      const token = req.query.token;
      const decoded = verify(token, process.env.HOLA_MUNDO_SECRETO);
      if (decoded) next();
    } else {
      return res.status(401).send("invalid token...");
    }
  } catch (err) {
    console.log(err);
    return res.status(401).send("invalid token...");
  }
}

export { tokenHelper };
