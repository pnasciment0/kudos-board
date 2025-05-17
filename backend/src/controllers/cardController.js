// src/controllers/cardController.js
import prisma from '../lib/prisma.js';

// GET all cards
export const getAllCards = async (req, res) => {
  try {
    const cards = await prisma.card.findMany();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
};

// GET card by ID
export const getCardById = async (req, res) => {
  try {
    const card = await prisma.card.findUnique({
      where: { id: Number(req.params.id) }
    });

    if (!card) return res.status(404).json({ error: 'Card not found' });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch card' });
  }
};

// GET cards by board ID
export const getCardsByBoardId = async (req, res) => {
  console.log("getCardsByBoardId hit");
  try {
    const cards = await prisma.card.findMany({
      where: { boardId: Number(req.params.boardId) }
    });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cards for board' });
  }
};

// CREATE card
export const createCard = async (req, res) => {
  const { description, author, gif, boardId, title } = req.body;

  try {
    const card = await prisma.card.create({
      data: {
        message:description,
        author,
        gif,
        board: { connect: { id: Number(boardId) } },
        title
      }
    });
    res.status(201).json(card);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to create card' });
  }
};

// UPDATE card
// export const updateCard = async (req, res) => {
//   console.log("update card hit");
//   const { message, author, gif, upvotes } = req.body;

//   try {
//     const card = await prisma.card.update({
//       where: { id: Number(req.params.id) },
//       data: { message, author, gif, upvotes }
//     });
//     res.json(card);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to update card' });
//   }
// };

export const upvoteCard = async (req, res) => {
  try {
    const card = await prisma.card.update({
      where: { id: Number(req.params.id) },
      data: {
        upvotes: { increment: 1 }
      }
    });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: 'Failed to upvote card' });
  }
};

// DELETE card
export const deleteCard = async (req, res) => {
  try {
    await prisma.card.delete({
      where: { id: Number(req.params.id) }
    });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete card' });
  }
};
