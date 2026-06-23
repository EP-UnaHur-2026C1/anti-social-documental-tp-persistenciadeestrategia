const express = require("express");
const dotenv = require("dotenv");
const conectarDB = require("./config/db");

const routerTag = require("./routes/tagRoutes");
const routerPost = require("./routes/postRoutes");

dotenv.config();

const app = express();

app.use(express.json());

app.use("/tags", routerTag);
app.use("/posts", routerPost);

conectarDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
