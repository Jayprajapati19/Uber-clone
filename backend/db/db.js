const mongoose = require("mongoose");

function connectToDb() {
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => console.log("Connected to the database successfully!"))
    .catch((error) =>
      console.error("Error connecting to the database:", error.message)
    );
}

module.exports = connectToDb;
