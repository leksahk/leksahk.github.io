import React, { useState, useEffect } from 'react';

const MyProjects = () => {
  const [projects, setProjects] = useState([]); // Стан для даних із бази
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data); 
        setLoading(false);
      })
      .catch(err => {
        console.error("Помилка зв'язку:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-container">
      <h2 className="page-title">Твої персональні розробки (LIVE)</h2>
      <p>Ці дані прийшли з Firebase через твій Node.js сервер!</p>
      
      <div className="results-list">
        {loading ? (
          <p>Завантаження даних із сервера...</p>
        ) : projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="result-card" style={{ borderLeft: '6px solid #8a2be2' }}>
              <span className="team">{project.title}</span>
              <span className="score">
                Статус: <strong>{project.description}</strong>
              </span>
              <br />
              <small>Команда: {project.teamName}</small>
            </div>
          ))
        ) : (
          <p>У базі Firebase поки порожньо.</p>
        )}
      </div>
    </div>
  );
};

export default MyProjects;