import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HackathonCard from './HackathonCard';
import ParticipantList from './ParticipantList';
import Results from './Results';   
import './App.css';

const data = [
  { id: 1, title: "AI Masters", category: "AI", deadline: "21.03" },
  { id: 2, title: "Web Revolution", category: "Web", deadline: "30.03" },
  { id: 3, title: "Cyber Shield", category: "Cyber", deadline: "20.04" }
];

function App() {
  const [filter, setFilter] = useState('All'); 

  const filteredData = filter === 'All' ? data : data.filter(h => h.category === filter);

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/">Змагання</Link> 
          <Link to="/participants">Учасники</Link>
          <Link to="/results">Результати</Link>
        </nav>

        <Routes>
          <Route path="/" element={
            <div className="competitions">
              <div className="filters">
                <button onClick={() => setFilter('All')}>Всі</button>
                <button onClick={() => setFilter('AI')}>AI</button>
                <button onClick={() => setFilter('Web')}>Web</button>
                <button onClick={() => setFilter('Cyber')}>Cyber</button>
              </div>
              <div className="grid-container">
                {filteredData.map(h => <HackathonCard key={h.id} {...h} />)}
              </div>
            </div>
          } />
          <Route path="/participants" element={<ParticipantList />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;