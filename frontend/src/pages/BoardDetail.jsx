import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { fetchBoards } from "../api/kudosBoards"; // reuse boards API
import { fetchCards, createCard, deleteCard, upvoteCard } from "../api/cards";
import { Link } from 'react-router-dom';
import '../styles/BoardDetail.css'; 

export default function BoardDetail({ }) {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    gif: "",
    author: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const boards = await fetchBoards();
      // Find the board with the matching ID
      const foundBoard = boards.find((b) => b.id === Number(id));
      setBoard(foundBoard || null);
      const cardsData = await fetchCards(id);
      setCards(cardsData);
      setLoading(false);
    }
    loadData();
  }, [id]);

  function validate() {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Title is required";
    if (!formData.description.trim()) errors.description = "Description is required";
    if (!formData.gif.trim()) errors.gif = "GIF URL is required";
    else if (!formData.gif.match(/^https?:\/\/.+\.(gif|jpg|jpeg|png|webp)$/i)) {
      errors.gif = "GIF must be a valid image URL";
    }
    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    const newCard = await createCard(id, formData);
    setCards((prev) => [...prev, newCard]);
    setFormData({ title: "", message: "", gif: "", author: "" });
    setSubmitting(false);
  }

  async function handleDelete(cardId) {
    await deleteCard(id, cardId);
    setCards((prev) => prev.filter((c) => c.id !== cardId));
  }

  async function handleUpvote(cardId) {
    const updatedCard = await upvoteCard(id, cardId);
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? updatedCard : c))
    );
  }

  if (loading) return <div>Loading board details...</div>;
  if (!board) return <div>Board not found.</div>;

  return (
    <div className="board-container">
      <div className="board-header">
        <h1>{board.title}</h1>
        <p>{board.description}</p>
        <p><span className="label">Category:</span> {board.category}</p>
        <p><span className="label">Author:</span> {board.author || "Unknown"}</p>
        {board.image && (
          <img
            src={board.image}
            alt={`Board ${board.title}`}
            className="board-image"
          />
        )}
      </div>
  
      <h2>Cards</h2>
      {cards.length === 0 ? (
        <p>No cards yet — be the first to add one!</p>
      ) : (
        <ul className="card-list">
          {cards.map((card) => (
            <li key={card.id} className="card">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <img src={card.gif} alt={card.title} />
              <p><span className="label">Author:</span> {card.author || "Anonymous"}</p>
              <p>Upvotes: {card.upvotes}</p>
              <div className="card-buttons">
                <button onClick={() => handleUpvote(card.id)}>Upvote</button>
                <button onClick={() => handleDelete(card.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
  
      <h2>Add New Card</h2>
      <form onSubmit={handleSubmit} className="add-card-form">
        <div>
          <label>Title*</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          {formErrors.title && <div style={{ color: "red" }}>{formErrors.title}</div>}
        </div>
  
        <div>
          <label>Description*</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          {formErrors.description && <div style={{ color: "red" }}>{formErrors.description}</div>}
        </div>
  
        <div>
          <label>GIF URL*</label>
          <input
            type="url"
            value={formData.gif}
            onChange={(e) => setFormData({ ...formData, gif: e.target.value })}
          />
          {formErrors.gif && <div style={{ color: "red" }}>{formErrors.gif}</div>}
        </div>
  
        <div>
          <label>Author (optional)</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          />
        </div>
  
        <button type="submit" disabled={submitting}>
          {submitting ? "Adding..." : "Add Card"}
        </button>
  
        <br />
        <Link to="/" className="back-button">← Back to Dashboard</Link>
      </form>
    </div>
  );  
}
