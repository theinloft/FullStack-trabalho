import { Request, Response, Router } from "express";
import { PedidoController } from "../controller/pedido-controller";

export const pedidoRotas = (controller: PedidoController): Router => {
  const router = Router();

  /**
   * @swagger
   * /api/pedidos/:
   *   post:
   *     summary: Cria um novo pedido com itens
   *     tags:
   *       - Pedidos
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - clienteId
   *               - itens
   *             properties:
   *               clienteId:
   *                 type: string
   *                 format: uuid
   *                 example: d9f80a07-4c1e-4ff0-b7f5-e613e476b106
   *               itens:
   *                 type: array
   *                 items:
   *                   type: object
   *                   required:
   *                     - produtoId
   *                     - quantidade
   *                   properties:
   *                     produtoId:
   *                       type: string
   *                       format: uuid
   *                       example: f028b022-685a-47d2-89e6-2647827f3ea1
   *                     quantidade:
   *                       type: number
   *                       example: 2
   *     responses:
   *       201:
   *         description: Pedido criado com sucesso
   *       400:
   *         description: Dados inválidos
   *       404:
   *         description: Cliente ou produto não encontrado
   */
  router.post("/", controller.inserir);

  /**
   * @swagger
   * /api/pedidos/:
   *   get:
   *     summary: Lista todos os pedidos
   *     tags:
   *       - Pedidos
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de pedidos
   */
  router.get("/", controller.listar);

  /**
   * @swagger
   * /api/pedidos/atualizar-status/{id}:
   *   put:
   *     summary: Atualiza o status de um pedido
   *     tags:
   *       - Pedidos
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID do pedido
   *         schema:
   *           type: string
   *           format: uuid
   *           example: 3c57e14d-1234-5678-abcd-ef0123456789
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - status
   *             properties:
   *               status:
   *                 type: string
   *                 enum: [andamento, concluido, cancelado]
   *                 example: concluido
   *     responses:
   *       200:
   *         description: Status atualizado com sucesso
   *       400:
   *         description: Status inválido
   *       404:
   *         description: Pedido não encontrado
   */
  router.put("/atualizar-status/:id", controller.atualizarStatus);

  /**
   * @swagger
   * /api/pedidos/{id}:
   *   get:
   *     summary: Busca um pedido por ID
   *     tags:
   *       - Pedidos
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID do pedido
   *         schema:
   *           type: string
   *           format: uuid
   *           example: 77eb3275-9fcb-47cc-8d01-5dd935f956c7
   *     responses:
   *       200:
   *         description: Pedido encontrado
   *       404:
   *         description: Pedido não encontrado
   */
  router.get("/:id", controller.buscarPorId);

  /**
   * @swagger
   * /api/pedidos/{id}:
   *   put:
   *     summary: Edita um pedido existente
   *     tags:
   *       - Pedidos
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID do pedido
   *         schema:
   *           type: string
   *           format: uuid
   *           example: 3c57e14d-1234-5678-abcd-ef0123456789
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - clienteId
   *               - itens
   *             properties:
   *               clienteId:
   *                 type: string
   *                 format: uuid
   *                 example: d9f80a07-4c1e-4ff0-b7f5-e613e476b106
   *               itens:
   *                 type: array
   *                 items:
   *                   type: object
   *                   required:
   *                     - produtoId
   *                     - quantidade
   *                   properties:
   *                     produtoId:
   *                       type: string
   *                       format: uuid
   *                       example: f028b022-685a-47d2-89e6-2647827f3ea1
   *                     quantidade:
   *                       type: integer
   *                       example: 2
   *     responses:
   *       200:
   *         description: Pedido atualizado com sucesso
   *       400:
   *         description: Dados inválidos
   *       404:
   *         description: Pedido não encontrado
   */
  router.put("/:id", controller.editarPedido);

  return router;
};
