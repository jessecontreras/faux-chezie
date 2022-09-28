//Import environment variable(s)
import "dotenv/config";
//Node and local imports
import path from "path";
import { fileURLToPath } from "url";
import { Connection } from "./_helpers/dbConnection.helper.mjs";
//Third party imports
import express from "express";
import cors from "cors";
//Define route files
import { accountRoute } from "./routes/account.routes.mjs";
import { ergsRoute } from "./routes/ergs.routes.mjs";
//Create express app
const app = express();
//Store the absolute value of path of current module
const __filename = fileURLToPath(import.meta.url);
//Reference cwd
const __dirname = path.dirname(__filename);
//Set view engine for html view rendering see for more info: https://handlebarsjs.com/
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/templates"));
//Enable express to handle strings, arrays, JSON Objects
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
//Enable CORS
app.use(cors());
//Start server
app.listen(process.env.PORT, async () => {
  console.log(`Server running on port: ${process.env.PORT}`);
  await Connection.open();
});
//Establish frontend SPA path
app.use(express.static(path.join(__dirname, `${process.env.SPA_PATH}`)));

//Direct api calls to router directory and files
app.use("/apis/accounts", accountRoute);
app.use("/apis/ergs", ergsRoute);

//Serve frontend SPA
app.get("*", (req, res) => {
  console.log("Made it to server angular!");
  //res.send("Hello World!");
  res.sendFile(path.join(__dirname, `${process.env.SPA_PATH}/index.html`));
});
//If we have a jwt or unath. error

//Error handling
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    console.log(err);
    res.status(401).send("invalid token...");
  }
});
