const path = require("path");

const express = require("express");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");

const conectarDB = require("./config/db");

const routerTag = require("./routes/tagRoutes");
const routerPost = require("./routes/postRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

const swaggerDocument = YAML.load(path.join(__dirname, "../swagger.yaml"));

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/tags", routerTag);
app.use("/api/posts", routerPost);

const startServer = async () => {
  try {
    await conectarDB();

    app.listen(PORT, () => {
      console.log(`Servidor en http://localhost:${PORT}`);
      console.log(`Swagger en http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("Error iniciando el servidor:", error);
    process.exit(1);
  }
};

startServer();
