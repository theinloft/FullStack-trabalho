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
import { Categoria } from "./entity/categoria";

import { ProdutoService } from "./service/produto-service";
import { PedidoService } from "./service/pedido-service";
import { ClienteService } from "./service/cliente-service";
import { UsuarioService } from "./service/usuario-service";
import { CategoriaService } from "./service/categoria-service";

import { ProdutoController } from "./controller/produto-controller";
import { PedidoController } from "./controller/pedido-controller";
import { ClienteController } from "./controller/cliente-controller";
import { UsuarioController } from "./controller/usuario-controller";
import { CategoriaController } from "./controller/categoria-controller";

import { produtoRotas } from "./router/produto-router";
import { pedidoRotas } from "./router/pedido-router";
import { clienteRotas } from "./router/cliente-router";
import { usuarioRotas } from "./router/usuario-router";
import { categoriaRotas } from "./router/categoria-router";

import { UsuarioRepository } from "./repository/usuario-repository";

const app = express();
const port = 3000;

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3000"] }));
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    app.use("/uploads", express.static("my-uploads"));

    // repositórios
    const produtoRepository = AppDataSource.getRepository(Produto);
    const clienteRepository = AppDataSource.getRepository(Cliente);
    const pedidoRepository = AppDataSource.getRepository(Pedido);
    const categoriaRepository = AppDataSource.getRepository(Categoria);
    const usuarioRepository = new UsuarioRepository();

    // services
    const produtoService = new ProdutoService(produtoRepository);
    const clienteService = new ClienteService(clienteRepository);
    const pedidoService = new PedidoService(
      pedidoRepository,
      clienteRepository,
      produtoRepository,
    );
    const categoriaService = new CategoriaService(categoriaRepository);
    const usuarioService = new UsuarioService(usuarioRepository);

    // controllers
    const produtoController = new ProdutoController(produtoService);
    const clienteController = new ClienteController(clienteService);
    const pedidoController = new PedidoController(pedidoService);
    const categoriaController = new CategoriaController(categoriaService);
    const usuarioController = new UsuarioController(usuarioService);

    // swagger
    app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec, {
        swaggerOptions: {
          supportedSubmitMethods: ["get", "post", "put", "delete"],
          persistAuthorization: true,
        },
      }),
    );

    // rotas públicas
    app.use("/api/usuarios", usuarioRotas(usuarioController));

    // rotas protegidas
    app.use("/api/clientes", autenticar, clienteRotas(clienteController));
    app.use("/api/pedidos", autenticar, pedidoRotas(pedidoController));
    app.use("/api/produtos", autenticar, produtoRotas(produtoController));
    app.use("/api/categorias", autenticar, categoriaRotas(categoriaController));

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
