const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const cors = require("cors");
require("dotenv-flow").config({ silent: true });
const logger = require("morgan");

const readRecursively = require("./utils/readRecursively");

app.use(
  logger(":method :url :status :res[content-length] - :response-time ms ")
);

// enabling CORS for any unknown origin(https://xyz.example.com)
app.use(cors());

// import other routes
try {
  // automatically import from folder router
  readRecursively("./controllers").then((result) => {
    result.map(async (item) => {
      if (
        !item.includes("utils") &&
        item.split(".")[item.split(".").length - 1] != "xlsx"
      ) {
        let file = null;
        try {
          // Modify the file path construction to directly point to the controller file
          file = require(`./${item}`);
          app.use(file._router);
        } catch (err) {
          // eslint-disable-next-line
          console.error({ item, err });
        }
      }
    });
  });
} catch (err) {
  // eslint-disable-next-line
  console.error({ err });
}

// app.listen(PORT, () => {console.log('listening on port ' + PORT)})
module.exports = app;
