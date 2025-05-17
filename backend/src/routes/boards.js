// src/routes/boards.js
import express from 'express';
import {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
} from '../controllers/boardController.js';

import { validateBoard } from '../middleware/validate.js';

const router = express.Router();

// GET all boards
router.get('/', getAllBoards);

// GET a single board by ID
router.get('/:id', getBoardById);

// POST create new board
router.post('/', validateBoard, createBoard);

// PUT update board
router.put('/:id', validateBoard, updateBoard);

// DELETE board
router.delete('/:id', deleteBoard);

export default router;
