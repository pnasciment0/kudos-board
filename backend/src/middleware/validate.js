// src/middleware/validate.js

export const validateBoard = (req, res, next) => {
    const { title, category, author } = req.body;
  
    if (!title || !category || !author) {
      return res.status(400).json({ error: 'Missing required board fields' });
    }
  
    next();
  };
  
  // export const validateCard = (req, res, next) => {
  //   console.log("middleware hit")
  //   console.log(req);
  //   const { message, author, boardId } = req.body;
  
  //   if (!message || !author || !boardId) {
  //     return res.status(400).json({ error: 'Missing required card fields' });
  //   }
  
  //   next();
  // };
  
    export const validateCard = (req, res, next) => {
      if (req.method === 'POST') {
        const { description, author, boardId } = req.body;
    
        if (!description || !author || !boardId) {
          console.log("Missing required card fields");
          return res.status(400).json({ error: 'Missing required card fields' });
        }
    
        req.body.boardId = boardId; // attach boardId to body for controller
      }
      next();
    };
  