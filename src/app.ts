import "reflect-metadata";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

import { AppDataSource } from "./data-source";
import { autenticar } from "./middleware/auth";

import { Produto } from "./entity/produto";
import { Cliente } from "./entity/cliente";
import { Pedido } from "./entity/pedido";

import { ProdutoService } from "./service/produto-service";
import { PedidoService } from "./service/pedido-service";
import { ClienteService } from "./service/cliente-service";
import { UsuarioService } from "./service/usuario-service";

import { ProdutoController } from "./controller/produto-controller";
import { PedidoController } from "./controller/pedido-controller";
import { ClienteController } from "./controller/cliente-controller";
import { UsuarioController } from "./controller/usuario-controller";

import { produtoRotas } from "./router/produto-router";
import { pedidoRotas } from "./router/pedido-router";
import { clienteRotas } from "./router/cliente-router";
import { usuarioRotas } from "./router/usuario-router";

import { UsuarioRepository } from "./repository/usuario-repository";

const app = express();
const port = 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    app.use("/uploads", express.static("my-uploads"));

    // repositórios
    const produtoRepository = AppDataSource.getRepository(Produto);
    const clienteRepository = AppDataSource.getRepository(Cliente);
    const pedidoRepository = AppDataSource.getRepository(Pedido);
    const usuarioRepository = new UsuarioRepository();

    // services
    const produtoService = new ProdutoService(produtoRepository);
    const clienteService = new ClienteService(clienteRepository);
    const pedidoService = new PedidoService(
      pedidoRepository,
      clienteRepository,
      produtoRepository,
    );
    const usuarioService = new UsuarioService(usuarioRepository);

    // controllers
    const produtoController = new ProdutoController(produtoService);
    const clienteController = new ClienteController(clienteService);
    const pedidoController = new PedidoController(pedidoService);
    const usuarioController = new UsuarioController(usuarioService);

    // swagger
    app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec, {
        swaggerOptions: {
          supportedSubmitMethods: ["get", "post", "put", "delete"],
        },
      }),
    );

    // rotas públicas
    app.use("/api/usuarios", usuarioRotas(usuarioController));
    console.log("✓ Rota /api/usuarios registrada"); // ← adiciona isso

    // rotas protegidas
    app.use("/api/clientes", autenticar, clienteRotas(clienteController));
    app.use("/api/pedidos", autenticar, pedidoRotas(pedidoController));
    app.use("/api/produtos", autenticar, produtoRotas(produtoController));

    app.get("/teste", (req, res) => {
      res.send("OK");
    });

    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
      console.log(`Documentação: http://localhost:${port}/api-docs`);
    });
  })
  .catch((erro) => {
    console.error("Erro ao conectar no banco:", erro);
  });
