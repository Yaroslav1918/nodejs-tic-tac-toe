const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();
const { DB_HOST } = process.env;
console.log(DB_HOST);
const MONGO_URI = "https://git.heroku.com/tic-tac-toe-game.git";
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(MONGO_URI, () => {
      console.log("Server running. Use our API on port: 3038");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
