import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import fs from "fs";

const routerPath = path.join(__dirname, "router");
const routerFiles = fs
  .readdirSync(routerPath)
  .map((f) => path.join(routerPath, f));

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "APIs Ecommerce",
      version: "1.0.0",
    },
  },
  apis: routerFiles,
});

export default swaggerSpec;
