const mongoose = require("mongoose");

function ClientDB(uri) {
  try {
    // Connect to the MongoDB cluster
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
      console.log("Client Datbase is connected")
    );
  } catch (e) {
    console.log("Client Datbase not connected");
  }
}

module.exports = {
  ClientDB: ClientDB,
};
