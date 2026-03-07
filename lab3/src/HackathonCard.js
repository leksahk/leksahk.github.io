import React, { useState } from 'react'; 

const HackathonCard = ({ title, category, deadline }) => {
  //false — ще не беремо участь, true — вже в списку
  const [isJoined, setIsJoined] = useState(false);

  const handleJoin = () => {
    setIsJoined(true); 
    alert(`Ви успішно зареєстровані на ${title}!`); 
  };

  return (
    <div className={`card ${category.toLowerCase()}`}>
      <div className="card-icon">{category}</div>
      <div className="card-content">
        <h3>{title}</h3>
        <p><strong>Категорія:</strong> {category}</p>
        <p><strong>Дедлайн:</strong> {deadline}</p>
        
        {/* Якщо isJoined true, додаємо клас btn-joined і змінюємо текст */}
        <button 
          className={`btn-more ${isJoined ? 'btn-joined' : ''}`} 
          onClick={handleJoin}
          disabled={isJoined}
        >
          {isJoined ? 'Ви у списку' : 'Взяти участь'}
        </button>
      </div>
    </div>
  );
};

export default HackathonCard;