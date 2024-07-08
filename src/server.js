require("dotenv").config();
require("./database");
const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})