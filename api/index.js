import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

const abc = dotenv.config({ path: path.resolve("api", "config.env") });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    dbName: "real-estate",
  })
  .then(() => {
    console.log("Connected to the database successfully");
  })
  .catch((err) => console.log(err));

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
