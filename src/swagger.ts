// import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import fs from "fs";
import swaggerJsdoc from "swagger-jsdoc";

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
    tags: [
      { name: "Usuarios", description: "Rotas de autenticação" },
      { name: "Clientes", description: "Gerenciamento de clientes" },
      { name: "Pedidos", description: "Gerenciamento de pedidos" },
      { name: "Produtos", description: "Gerenciamento de produtos" },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/**/*.ts", "./dist/**/*.js"],
});

console.log("Swagger spec:", JSON.stringify(swaggerSpec, null, 2));

export default swaggerSpec;
