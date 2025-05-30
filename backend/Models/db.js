const mongoose = require("mongoose");
const Mongo_Url = process.env.MONGO_URL;

mongoose
  .connect(Mongo_Url)
  .then(() => {
    console.log("MongoDB Connected....");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error...", error);
  });
