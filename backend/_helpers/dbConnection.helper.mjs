/**
 * @class Manages mongodb connection. Ensures there are a minimal amount mongo connections spawned at once. Think of this as a pseudo-singleton.
 */

import { MongoClient } from "mongodb";

class Connection {
  /**
   * Connect to MongoClient.
   *
   * @returns {Promise<object>} MongoClient db object.
   */
  static async open() {
    try {
      if (this.db) return this.db;
      const mongoClient = new MongoClient(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const client = await mongoClient.connect();
      this.db = client.db(process.env.FAUX_CHEZIE_DB);

      return this.db;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

Connection.db = null;

export { Connection };
