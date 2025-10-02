import { Router } from "express";
import { register, login, verifyToken } from "../controllers/userController";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Isaac Melo"
 *               email:
 *                 type: string
 *                 example: "isaac@example.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro de validação
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Faz login do usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "isaac@example.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Email ou senha inválidos
 */

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-token", verifyToken);

export default router;
