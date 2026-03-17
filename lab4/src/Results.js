import React from 'react';

const Results = () => {
  const scores = [
    { id: 1, team: "Alpha", points: 1250, status: "Winner" },
    { id: 2, team: "Beta", points: 1100, status: "Runner-up" }
  ];

  return (
    <div className="page-container">
      <h2 className="page-title">Турнірна таблиця</h2>
      <div className="results-list">
        {scores.map(s => (
          <div key={s.id} className="result-card">
            <span className="place">#{s.id}</span>
            <span className="team">{s.team}</span>
            <span className="score"><strong>{s.points}</strong> балів</span>
            <span className="status">{s.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;