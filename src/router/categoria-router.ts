import { Request, Response, Router } from "express";
import { CategoriaController } from "../controller/categoria-controller";

export const categoriaRotas = (controller: CategoriaController): Router => {
  const router = Router();

  /**
   * @swagger
   * /api/categorias/{id}:
   *   put:
   *     summary: Atualiza uma categoria pelo ID
   *     tags:
   *       - Categorias
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID da categoria
   *         schema:
   *           type: integer
   *           format: int32
   *           example: 1
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - categoria
   *             properties:
   *               categoria:
   *                 type: string
   *                 example: Eletrônicos
   *     responses:
   *       200:
   *         description: Categoria atualizada com sucesso
   *       400:
   *         description: Requisição inválida
   *       404:
   *         description: Categoria não encontrada
   *       500:
   *         description: Erro interno do servidor
   */
  router.put("/:id", controller.atualizar);

  /**
   * @swagger
   * /api/categorias/{id}:
   *   get:
   *     summary: Busca categoria por ID
   *     tags:
   *       - Categorias
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID da categoria
   *         schema:
   *           type: integer
   *           format: int32
   *           example: 1
   *     responses:
   *       200:
   *         description: Categoria encontrada
   *       404:
   *         description: Categoria não encontrada
   */
  router.get("/:id", controller.buscarPorId);

  /**
   * @swagger
   * /api/categorias/:
   *   post:
   *     summary: Cria uma categoria
   *     tags:
   *       - Categorias
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - categoria
   *             properties:
   *               categoria:
   *                 type: string
   *                 example: Eletrônicos
   *     responses:
   *       201:
   *         description: Categoria criada com sucesso
   */
  router.post("/", controller.inserir);

  /**
   * @swagger
   * /api/categorias/:
   *   get:
   *     summary: Lista todas as categorias
   *     tags:
   *       - Categorias
   *     responses:
   *       200:
   *         description: Lista de categorias
   *       array vazio:
   *         description: Nenhuma categoria encontrada
   */
  router.get("/", controller.listar);

  /**
   * @swagger
   * /api/categorias/{id}:
   *   delete:
   *     summary: Remove uma categoria pelo ID
   *     tags:
   *       - Categorias
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID da categoria
   *         schema:
   *           type: integer
   *           format: int32
   *           example: 1
   *     responses:
   *       200:
   *         description: Categoria removida com sucesso
   *       404:
   *         description: Categoria não encontrada
   */
  router.delete("/:id", controller.deletar);

  return router;
};
