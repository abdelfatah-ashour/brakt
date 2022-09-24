const mongoose = require("mongoose");

module.exports = async function connectToDatabase(uri) {
  await mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      dbName: "brakt",
    })
    .then(() => {
      console.log("connected to db");
    })
    .catch(error => {
      console.error(error.message);
    });
};
