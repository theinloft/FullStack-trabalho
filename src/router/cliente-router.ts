import { Request, Response, Router } from "express";
import { ClienteController } from "../controller/cliente-controller";

export const clienteRotas = (controller: ClienteController): Router => {
  const router = Router();

  /**
   * @swagger
   * /api/clientes/{id}:
   *   put:
   *     summary: Atualiza um cliente pelo ID
   *     tags:
   *       - Clientes
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID do cliente
   *         schema:
   *           type: string
   *           example: "d9f80a07-4c1e-4ff0-b7f5-e613e476b106"
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - nome
   *               - email
   *             properties:
   *               nome:
   *                 type: string
   *                 example: João da Silva
   *               email:
   *                 type: string
   *                 example: joao.silva@example.com
   *     responses:
   *       200:
   *         description: Cliente atualizado com sucesso
   *       400:
   *         description: Requisição inválida
   *       404:
   *         description: Cliente não encontrado
   *       500:
   *         description: Erro interno do servidor
   */
  router.put("/:id", controller.atualizar);

  /**
   * @swagger
   * /api/clientes/{id}:
   *   get:
   *     summary: Busca cliente por ID
   *     tags:
   *       - Clientes
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID do cliente
   *         schema:
   *           type: string
   *           example: "d9f80a07-4c1e-4ff0-b7f5-e613e476b106"
   *     responses:
   *       200:
   *         description: Cliente encontrado
   *       404:
   *         description: Cliente não encontrado
   */
  router.get("/:id", controller.buscarPorId);

  /**
   * @swagger
   * /api/clientes/:
   *   post:
   *     summary: Cria um cliente
   *     tags:
   *       - Clientes
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - nome
   *               - email
   *             properties:
   *               nome:
   *                 type: string
   *                 example: João da Silva
   *               email:
   *                 type: string
   *                 example: joao.silva@example.com
   *
   *     responses:
   *       201:
   *         description: Cliente criado com sucesso
   */
  router.post("/", controller.inserir);

  /**
   * @swagger
   * /api/clientes/:
   *   get:
   *     summary: Lista todos os clientes
   *     tags:
   *       - Clientes
   *     responses:
   *       200:
   *         description: Lista de clientes
   *       array vazio:
   *         description: Nenhum cliente encontrado
   */
  router.get("/", controller.listar);

  /**
   * @swagger
   * /api/clientes/{id}:
   *   delete:
   *     summary: Remove um cliente pelo ID
   *     tags:
   *       - Clientes
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID do cliente
   *         schema:
   *           type: string
   *           example: "d9f80a07-4c1e-4ff0-b7f5-e613e476b106"
   *     responses:
   *       200:
   *         description: Cliente removido com sucesso
   *       404:
   *         description: Cliente não encontrado
   */
  router.delete("/:id", controller.deletar);

  return router;
};
