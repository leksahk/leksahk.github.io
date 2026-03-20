import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Timer from './Timer';
import HackathonCard from './HackathonCard';
import ParticipantList from './ParticipantList';
import Results from './Results';
import './App.css';

const data = [
  { id: 1, title: "AI Challenge", category: "AI", theme: "Штучний інтелект для екології", deadline: "22.03", fullDate: "March 22, 2026 23:59:59" },
  { id: 2, title: "Cyber Hack", category: "Cyber", theme: "Кібербезпека банківських систем", deadline: "25.03", fullDate: "March 25, 2026 23:59:59" },
  { id: 3, title: "Web Design Day", category: "Web", theme: "Адаптивні інтерфейси майбутнього", deadline: "01.04", fullDate: "April 01, 2026 23:59:59" }
];

function App() {
  const [activeFilters, setActiveFilters] = useState([]);

  const toggleFilter = (category) => {
    if (activeFilters.includes(category)) {
      setActiveFilters(activeFilters.filter(c => c !== category));
    } else {
      setActiveFilters([...activeFilters, category]);
    }
  };

  const filteredData = activeFilters.length === 0 ? data : data.filter(h => activeFilters.includes(h.category));

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Hackathon Arena</h1>
          <nav className="navbar">
            <NavLink to="/">Змагання</NavLink> 
            <NavLink to="/participants">Учасники</NavLink>
            <NavLink to="/results">Результати</NavLink>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={
              <div className="competitions">
                <Timer deadline={data[0].fullDate} name={data[0].title} />
                <div className="filters">
                  <button onClick={() => setActiveFilters([])} className={activeFilters.length === 0 ? 'active' : ''}>Всі</button>
                  {['AI', 'Web', 'Cyber'].map(cat => (
                    <button key={cat} onClick={() => toggleFilter(cat)} className={activeFilters.includes(cat) ? 'active' : ''}>
                      {cat} {activeFilters.includes(cat) ? '✓' : ''}
                    </button>
                  ))}
                </div>
                <div className="grid-container">
                  {filteredData.map(h => <HackathonCard key={h.id} {...h} />)}
                </div>
              </div>
            } />
            <Route path="/participants" element={<ParticipantList />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>

        <footer>
          <address>
            <p>Контакти: <a href="mailto:oleksandra.savchuk.oi.2024@lpnu.ua">oleksandra.savchuk.oi.2024@lpnu.ua</a></p>
            <p>Локація: м. Львів, Україна</p>
          </address>
          <p>&copy; 2026 Платформа Хакатонів</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;