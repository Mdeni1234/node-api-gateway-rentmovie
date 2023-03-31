const express = require("express");
const dotenv = require("dotenv");
var cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./src/docs/swagger.json");

const options = {
  customCssUrl: "https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui.css",
};

const router = require("./src/routes/main");

const app = express();
const port = 8000;

app.use(cors());
dotenv.config();
app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);

app.use("/", router);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
