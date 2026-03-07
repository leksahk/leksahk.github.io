import React, { useState } from 'react';

const HackathonCard = ({ title, category, theme, deadline }) => {
  const [isJoined, setIsJoined] = useState(false);

  return (
    <div className={`card ${category.toLowerCase()}`}>
      <div className="card-icon">{category}</div>
      <div className="card-content">
        <h3>{title}</h3>
        <p><strong>Дедлайн:</strong> {deadline}</p>
        <p className="theme-line">Тема: {theme}</p>
        <button 
          className={`btn-more ${isJoined ? 'btn-joined' : ''}`} 
          onClick={() => setIsJoined(true)}
          disabled={isJoined}
        >
          {isJoined ? 'Ви у списку' : 'Взяти участь'}
        </button>
      </div>
    </div>
  );
};

export default HackathonCard;