import React from 'react';

const Results = () => {
  const scoreboard = [
    { id: 1, team: "Alpha", points: 95, status: "Winner" },
    { id: 2, team: "Beta", points: 88, status: "Runner-up" }
  ];

  return (
    <div className="results-container">
      <h2>Турнірна таблиця</h2>
      <div className="results-list">
        {scoreboard.map(item => (
          <div key={item.id} className="result-card">
            <div className="place-badge">#{item.id}</div>
            <div className="team-info">
              <span className="team-name">{item.team}</span>
              <span className="status-tag">{item.status}</span>
            </div>
            <div className="points-display">
              <strong>{item.points}</strong> <span>балів</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;