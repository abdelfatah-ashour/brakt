const {connect} = require("mongoose");

async function connectDatabase(url) {
  return await connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}

module.exports = {connectDatabase};
