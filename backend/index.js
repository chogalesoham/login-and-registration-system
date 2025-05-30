const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./Routes/user-routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;
require("./Models/db");

//All Middlewares
app.use(bodyParser.json());
app.use(cors());

// All Routes
app.use("/api/auth", router);

app.listen(PORT, () => {
  console.log(`Server Runing on ${PORT}`);
});
