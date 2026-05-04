import { Request, Response, Router } from "express";
import { ProdutoController } from "../controller/produto-controller";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./my-uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.substring(
          file.originalname.length - 3,
          file.originalname.length,
        ),
    );
  },
});

//const upload = multer({dest:'./uploads/'});
const upload = multer({ storage: storage });

// /api/produto
export const produtoRotas = (controller: ProdutoController): Router => {
  const router = Router();

  /**
   * @swagger
   * /api/produtos/:
   *   post:
   *     summary: Cria um produto
   *     tags:
   *       - Produtos
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - nome
   *               - preco
   *               - categoria
   *             properties:
   *               nome:
   *                 type: string
   *                 example: camiseta getover
   *               preco:
   *                 type: number
   *                 example: 59.90
   *               categoria:
   *                 type: object
   *                 required:
   *                   - id
   *                 properties:
   *                   id:
   *                     type: integer
   *                     example: 1
   *     responses:
   *       201:
   *         description: Produto criado com sucesso
   */
  router.post("/", controller.inserir);

  /**
   * @swagger
   * /api/produtos/:
   *   get:
   *     summary: Lista todos os produtos
   *     tags:
   *       - Produtos
   *     responses:
   *       200:
   *         description: Lista de produtos
   *       array vazio:
   *         description: Nenhum produto encontrado
   */
  router.get("/", controller.listar);

/**
 * @swagger
 * /api/produtos/{id}:
 *   get:
 *     summary: Busca produto por ID
 *     tags:
 *       - Produtos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: string
 *           format: uuid
 *           example: 91586a2c-878f-48f8-8770-90a87a5acb06
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: 91586a2c-878f-48f8-8770-90a87a5acb06
 *                 nome:
 *                   type: string
 *                   example: Camiseta
 *                 preco:
 *                   type: number
 *                   example: 59.9
 *                 categoria:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *       404:
 *         description: Produto não encontrado
 */
router.get("/:id", controller.buscarPorId);

    /**
   * @swagger
   * /api/produtos/{id}:
   *   delete:
   *     summary: Remove um produto pelo ID
   *     tags:
   *       - Produtos
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID do produto
   *         schema:
   *           type: uuid
   *           example: 91586a2c-878f-48f8-8770-90a87a5acb06
   *     responses:
   *       200:
   *         description: Produto removido com sucesso
   *       404:
   *         description: Produto não encontrado
   */
  router.delete("/:id", controller.deletar);

  /**
   * @swagger
   * /api/produtos/{id}:
   *   put:
   *     summary: Atualiza um produto
   *     tags:
   *       - Produtos
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID do produto
   *         schema:
   *           type: uuid
   *           example: 91586a2c-878f-48f8-8770-90a87a5acb06
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - nome
   *               - preco
   *               - categoria
   *             properties:
   *               nome:
   *                 type: string
   *                 example: camiseta nova
   *               preco:
   *                 type: number
   *                 example: 79.90
   *               categoria:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                     example: 1
   *     responses:
   *       200:
   *         description: Produto atualizado com sucesso
   *       404:
   *         description: Produto não encontrado
   */
  router.put("/:id", controller.atualizar);
  


  router.post(
    "/imagens/upload",
    upload.single("imagem"),
    async (req: Request, res: Response): Promise<any> => {
      console.log(req.file);
      res.send("Imagem carregada com sucesso!");
    },
  );

  return router;
};
