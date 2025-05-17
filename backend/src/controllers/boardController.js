// src/controllers/boardController.js
import prisma from '../lib/prisma.js';

// GET all boards
// export const getAllBoards = async (req, res) => {
//   try {
//     const boards = await prisma.board.findMany({
//       include: { cards: true }
//     });
//     res.json(boards);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch boards' });
//   }
// };

// src/controllers/boardController.js

// export const getAllBoards = async (req, res) => {
//   const { category } = req.query; // read category from query params

//   try {
//     let boards;

//     if (category === 'recent') {
//       console.log('Fetching recent boards');
//       // Fetch the 6 most recent boards sorted by createdAt desc
//       boards = await prisma.board.findMany({
//         orderBy: { createdAt: 'desc' },
//         take: 6,
//         include: { cards: true }
//       });
//     } else if (category && category !== 'all') {
//       // Fetch boards filtered by category
//       boards = await prisma.board.findMany({
//         where: { category },
//         include: { cards: true }
//       });
//     } else {
//       // Fetch all boards without filter
//       boards = await prisma.board.findMany({
//         include: { cards: true }
//       });
//     }

//     res.json(boards);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch boards' });
//   }
// };

export const getAllBoards = async (req, res) => {
  const { category, search } = req.query; // read category and search query from query params

  try {
    let whereClause = {};

    // Add search filter if present
    if (search) {
      whereClause.title = {
        contains: search,
        mode: 'insensitive' // case-insensitive search
      };
    }

    if (category === 'recent') {
      const boards = await prisma.board.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        take: 6,
        include: { cards: true }
      });
      return res.json(boards);
    }

    if (category && category !== 'all') {
      whereClause.category = category;
    }

    const boards = await prisma.board.findMany({
      where: whereClause,
      include: { cards: true }
    });

    res.json(boards);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch boards' });
  }
};

// GET single board by ID
export const getBoardById = async (req, res) => {
  try {
    const board = await prisma.board.findUnique({
      where: { id: Number(req.params.id) },
      include: { cards: true }
    });

    if (!board) return res.status(404).json({ error: 'Board not found' });
    res.json(board);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch board' });
  }
};

// CREATE new board
export const createBoard = async (req, res) => {
  const { title, category, author, image } = req.body;

  try {
    const board = await prisma.board.create({
      data: { title, category, author, image }
    });
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create board' });
  }
};

// UPDATE board
export const updateBoard = async (req, res) => {
  const { title, category, author, image } = req.body;

  try {
    const board = await prisma.board.update({
      where: { id: Number(req.params.id) },
      data: { title, category, author, image }
    });
    res.json(board);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update board' });
  }
};

// DELETE board
export const deleteBoard = async (req, res) => {
  try {
    await prisma.board.delete({
      where: { id: Number(req.params.id) }
    });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete board' });
  }
};
