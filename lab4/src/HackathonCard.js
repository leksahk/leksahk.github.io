import React, { useState } from 'react';

const HackathonCard = ({ title, category, theme, deadline, rating }) => {
  const [isJoined, setIsJoined] = useState(false);

  const safeCategory = category ? category.toLowerCase() : 'general';

  return (
    <div className={`card ${safeCategory}`}>

      <div className="card-icon">{category || 'H'}</div>
      
      <div className="card-content">
        
        <div className="card-header">
          <h3>{title}</h3>
          {rating && (
            <span className="card-rating-inline">
              ⭐ {rating}
            </span>
          )}
        </div>
        
        {deadline && <p><strong>Дедлайн:</strong> {deadline}</p>}
        {theme && <p className="theme-line">Тема: {theme}</p>}
        
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