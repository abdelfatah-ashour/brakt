require("dotenv").config({
  path: "./config/.env",
});

const express = require("express");
const app = express();
const createServer = require("http").createServer(app);
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const { connectDatabase } = require("./config/db");

// import DB
connectDatabase(process.env.DB_URL)
  .then(() => {
    console.log("Connected DataBase");
  })
  .catch((err) => {
    console.log("Error COnntect: ", err.message);
  });

// import socket.io
require("./socket.io/index")(createServer);

// handling Error
process.on("uncaughtException", (error) => {
  console.log(`Error : ${error.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.log(`unHandleRejection : ${reason}`);
  process.exit(1);
});

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "deveelopment"
        ? process.env.CLIENT_URL_DEV
        : process.env.CLIENT_URL_PROD,
    credentials: true,
    path: "/",
  })
);

app.use("/v1/image/", express.static(path.join(__dirname, "public/images")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

/* start routes */
app.get("/test", (req, res) => {
  // for testing
  return res.status(200).json({
    message: `server is working on port ${process.env.PORT}`,
  });
});

app.use("/v1/author", require("./routes/author-routes"));
app.use("/v1/article", require("./routes/article-routes"));

/* Server running */
createServer.listen(process.env.PORT, () =>
  console.log(`Server is working on PORT ${process.env.PORT}`)
);
