import express, { Router, Request, Response } from "express";
import { autenticar } from "../middleware/auth";
import { UsuarioController } from "../controller/usuario-controller";

export function usuarioRotas(controller: UsuarioController) {
  const router = express.Router(); // ← troca Router() por express.Router()

  /**
   * @swagger
   * /api/usuarios/cadastro:
   *   post:
   *     summary: Cria um novo usuário
   *     tags:
   *       - Usuarios
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *               email:
   *                 type: string
   *               senha:
   *                 type: string
   *     responses:
   *       201:
   *         description: Usuário criado com sucesso
   *       400:
   *         description: Dados inválidos
   */
  router.post("/cadastro", (req, res) => {
    console.log("Entrou no cadastro");
    return controller.cadastrar(req, res);
  });

  /**
   * @swagger
   * /api/usuarios/login:
   *   post:
   *     summary: Autentica um usuário
   *     tags:
   *       - Usuarios
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               senha:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login realizado com sucesso, retorna token JWT
   *       401:
   *         description: Email ou senha incorretos
   */
  router.post("/login", (req: Request, res: Response) =>
    controller.login(req, res),
  );

  /**
   * @swagger
   * /api/usuarios/:
   *   get:
   *     summary: Lista todos os usuários
   *     tags:
   *       - Usuarios
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de usuários retornada com sucesso
   *       401:
   *         description: Token não fornecido ou inválido
   */
  router.get("/", autenticar, (req: Request, res: Response) =>
    controller.listar(req, res),
  );

  return router;
}
