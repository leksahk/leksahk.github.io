import React from 'react';

const MyProjects = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">Твої персональні розробки</h2>
      <p>Цей розділ доступний тільки тобі як зареєстрованому учаснику.</p>
      <div className="results-list">
        <div className="result-card" style={{ borderLeft: '6px solid #8a2be2' }}>
          <span className="team">Мій AI Стартап</span>
          <span className="score">Статус: <strong>В розробці</strong></span>
        </div>
        <div className="result-card" style={{ borderLeft: '6px solid #28a745' }}>
          <span className="team">Web Design Hack</span>
          <span className="score">Статус: <strong>Завершено</strong></span>
        </div>
      </div>
    </div>
  );
};

export default MyProjects;