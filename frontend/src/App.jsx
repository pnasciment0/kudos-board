import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import BoardDetail from './pages/BoardDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/board/:id" element={<BoardDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
