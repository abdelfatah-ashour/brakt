const mongoose = require("mongoose");

module.exports = async function connectToDatabase(uri) {
  await mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to db");
    })
    .catch(error => {
      console.error(error.message);
    });
};
