const API_BASE = 'http://localhost:3000/api/cards';

// Fetch cards by board ID
export async function fetchCards(boardId) {
  const res = await fetch(`${API_BASE}/board/${boardId}`);
  if (!res.ok) throw new Error('Failed to fetch cards');
  return res.json();
}

// Create a new card
export async function createCard(boardId, cardData) {
  console.log(boardId, cardData)
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...cardData, boardId }),
  });
  if (!res.ok) throw new Error('Failed to create card');
  return res.json();
}

// Delete a card
export async function deleteCard(boardId, cardId) {
  const res = await fetch(`${API_BASE}/${cardId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete card');
  return cardId;
}


export async function upvoteCard(boardId, cardId) {
  const res = await fetch(`${API_BASE}/upvote/${cardId}`, {
    method: 'PUT',
  });
  if (!res.ok) throw new Error('Failed to upvote card');
  return res.json();
}