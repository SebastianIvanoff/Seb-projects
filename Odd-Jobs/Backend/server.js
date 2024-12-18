const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 9999;
app.listen(PORT, () =>
  console.log("Server running at http://localhost:" + PORT)
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))

  .catch((err) => console.log(err.message));
