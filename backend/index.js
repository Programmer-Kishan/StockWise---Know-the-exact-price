const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 3000;

const app = express();

const stockRoutes = require('./routes/stock');

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(stockRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
