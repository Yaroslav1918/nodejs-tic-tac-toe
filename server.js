const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();
const { DB_HOST } = process.env;

const KEY =
  "mongodb+srv://Yaroslav:AIGWoHhd4rvtoq1K@atlascluster.y3krkt5.mongodb.net/Tic-tac-toe?retryWrites=true&w=majority";
mongoose
  .connect(KEY)
  .then(() => {
    app.listen(3038, () => {
      console.log("Server running. Use our API on port: 3038");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
