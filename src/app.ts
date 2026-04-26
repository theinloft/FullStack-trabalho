import express, { Request, Response } from "express";
import { produtoRotas } from "./router/produto-router";

import { ProdutoController } from "./controller/produto-controller";
import { ProdutoService } from "./service/produto-service";
import { ProdutoRepositoryMem } from "./repository/produto-repository-mem";
import { AppDataSource } from "./data-source";
import { Produto } from "./entity/produto";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import { pedidoRotas } from './router/pedido-router';
import { PedidoService } from "./service/pedido-service";
import { PedidoController } from "./controller/pedido-controller";
import { Pedido } from "./entity/pedido";

const app = express();
const port = 3000;
app.use(express.json());

// establish database connection
AppDataSource.initialize().then((async) => {
  app.use("/uploads", express.static("my-uploads"));

  //Inicializacao das dependencias
  const produtoRepository = AppDataSource.getRepository(Produto);
  const produtoService = new ProdutoService(produtoRepository);
  const produtoController = new ProdutoController(produtoService);
  const pedidoRepository = AppDataSource.getRepository(Pedido);
  const pedidoService = new PedidoService(pedidoRepository);
  const pedidoController = new PedidoController(pedidoService);

 app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        supportedSubmitMethods: ["get", "post", "put", "delete"],
      },
    })
  );
  
  app.use("/api/produto", produtoRotas(produtoController));
  app.use('/api/pedido', pedidoRotas(pedidoController));


  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}, para acessar a documentação da API: http://localhost:${port}/api-docs`);
  });
});
