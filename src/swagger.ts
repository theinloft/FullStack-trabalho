import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "APIs Ecommerce",
      version: "1.0.0",
    },
  },
  apis: [path.join(process.cwd(), "src/**/*.ts")], 
});

export default swaggerSpec;