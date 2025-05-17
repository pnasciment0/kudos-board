// const API_BASE = 'http://localhost:3000/api/boards';
const API_BASE = import.meta.env.VITE_API_BASE_URL + 'api/boards';

export async function fetchBoards(category = 'all', search = '') {
  try {
    const params = new URLSearchParams();

    if (category && category !== 'all') params.append('category', category);
    if (search) params.append('search', search);

    const url = `${API_BASE}?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch boards');
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}



// Create a new board
export async function createBoard(newBoard) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBoard),
  });
  if (!res.ok) throw new Error('Failed to create board');
  return res.json();
}

// Delete a board by id
export async function deleteBoard(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete board');
  return id;
}
