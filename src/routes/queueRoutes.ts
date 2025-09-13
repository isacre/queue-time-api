import { Router } from "express";
import {
  createQueue,
  getQueues,
  getQueueById,
  updateQueueItem,
  deleteQueue,
  addQueueItem,
  removeQueueItem,
} from "../controllers/queueController";
import { authMiddleware } from "../middlewares/authMiddleware";

/**
 * @swagger
 * tags:
 *   name: Queue
 *   description: Gerenciamento de filas
 */

/**
 * @swagger
 * /queue:
 *   post:
 *     summary: Cria uma nova fila
 *     tags: [Queue]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Fila de atendimento"
 *     responses:
 *       201:
 *         description: Fila criada com sucesso
 *       400:
 *         description: Erro ao criar fila
 */

/**
 * @swagger
 * /queue:
 *   get:
 *     summary: Obtém todas as filas
 *     tags: [Queue]
 *     responses:
 *       200:
 *         description: Filas obtidas com sucesso
 *       400:
 *         description: Erro ao obter filas
 */

/**
 * @swagger
 * /queue/{id}:
 *   get:
 *     summary: Obtém uma fila específica
 *     tags: [Queue]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da fila
 *     responses:
 *       200:
 *         description: Fila obtida com sucesso
 *       400:
 *         description: Erro ao obter fila
 */

/**
 * @swagger
 * /queue/{id}:
 *   delete:
 *     summary: Deleta uma fila
 *     tags: [Queue]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da fila
 *     responses:
 *       200:
 *         description: Fila deletada com sucesso
 *       400:
 *         description: Erro ao deletar fila
 */

/**
 * @swagger
 * /queue/{id}:
 *   post:
 *     summary: Adiciona um item à fila
 *     tags: [Queue]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da fila
 */

/**
 * @swagger
 * /queue/{id}:
 *   delete:
 *     summary: Remove um item da fila
 *     tags: [Queue]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da fila
 */

/**
 * @swagger
 * /queue/{id}:
 *   put:
 *     summary: Atualiza um item da fila
 *     tags: [Queue]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da fila
 */
const router = Router();

router.post("/", authMiddleware, createQueue);
router.get("/", authMiddleware, getQueues);
router.delete("/:id", authMiddleware, deleteQueue);
router.post("/:id", authMiddleware, addQueueItem);
router.delete("/:id", authMiddleware, removeQueueItem);
router.put("/:id", authMiddleware, updateQueueItem);
router.get("/:id", getQueueById);

export default router;
