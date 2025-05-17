import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchBoards, createBoard, deleteBoard } from "../api/kudosBoards";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CreateKudosBoardForm from '../components/CreateKudosBoardForm';
import '../styles/Dashboard.css'; 
import '../styles/Modal.css';

const categories = ['all', 'recent', 'celebration', 'thank you', 'inspiration'];

export default function Dashboard() {
  const [boards, setBoards] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    async function loadBoards() {
      setLoading(true);
      try {
        const fetched = await fetchBoards(filter);
        setBoards(fetched);
      } catch (err) {
        console.error("Failed to fetch boards:", err);
      } finally {
        setLoading(false);
      }
    }
    loadBoards();
  }, [filter]);

  const filteredBoards = boards.filter((board) =>
    board.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateBoard = async (newBoardData) => {
    try {
      const created = await createBoard(newBoardData);
      setBoards([created, ...boards]);
      setShowCreateModal(false);
    } catch (err) {
      console.error("Failed to create board:", err);
    }
  };

  const handleDeleteBoard = async (id) => {
    try {
      await deleteBoard(id);
      setBoards(boards.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Failed to delete board:", err);
    }
  };

  const handleClearSearch = () => {
    setSearch('');
  };

  return (
    <div className="dashboard-layout">
      <Header />
      <div className="dashboard">
        <div className="dashboard-controls">
          <label>
            Filter by category:{' '}
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </label>

          <label className="search-bar">
            Search boards:{' '}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title..."
            />
            {search && (
              <button onClick={handleClearSearch} className="clear-button">
                Clear
              </button>
            )}
          </label>
        </div>

        <div className="boards-list">
          {loading ? (
            <p>Loading boards...</p>
          ) : filteredBoards.length === 0 ? (
            <div className="welcome-board">
              <h2>Welcome to the Kudos Board 🎉</h2>
              <p>Get started by creating your first board!</p>
            </div>
          ) : (
            filteredBoards.map((board) => (
              <div key={board.id} className="board-card-wrapper">
                <Link to={`/board/${board.id}`} className="board-card">
                  <img src={board.image} alt={board.title} />
                  <h3>{board.title}</h3>
                  <p>{board.description}</p>
                  <p><strong>Author:</strong> {board.author}</p>
                  <p><strong>Category:</strong> {board.category}</p>
                </Link>
                <button onClick={() => handleDeleteBoard(board.id)}>Delete</button>
              </div>
            ))
          )}
        </div>

        <div className="create-board-container">
          <button onClick={() => setShowCreateModal(true)}>Create New Board</button>
        </div>

        {showCreateModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Create a New Kudos Board</h2>
              <CreateKudosBoardForm
                onSubmit={handleCreateBoard}
                onCancel={() => setShowCreateModal(false)}
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
    
  );
}
