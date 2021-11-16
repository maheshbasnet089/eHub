require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes/otp-routes");
const cors = require("cors");

const corsOption = {
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOption));
const PORT = process.env.PORT || 5500;

require("./database.js")(process.env.MONGO_CONNECTION_URL);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Routes
app.use(router);

app.get("/", (req, res) => {
  res.json({ message: "Home page" });
});

app.listen(PORT, () => {
  console.log(`Serving at port ${PORT}`);
});
