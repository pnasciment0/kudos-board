// src/routes/cards.js
import express from 'express';
import {
  getAllCards,
  getCardById,
  getCardsByBoardId,
  createCard,
  // updateCard,
  deleteCard,
  upvoteCard,
} from '../controllers/cardController.js';

import { validateCard } from '../middleware/validate.js';

// const router = express.Router();
const router = express.Router({ mergeParams: true });

// GET all cards
router.get('/', getAllCards);

// GET a single card by ID
router.get('/:id', getCardById);

// GET all cards for a specific board
router.get('/board/:boardId', getCardsByBoardId);

// POST create card
router.post('/', validateCard, createCard);

// PUT update card
// router.put('/:id', validateCard, updateCard);

router.put('/upvote/:id', upvoteCard);

// DELETE card
router.delete('/:id', deleteCard);

export default router;
