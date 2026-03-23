import React, { useState, useEffect } from 'react';
import './App.css';

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [teamName, setTeamName] = useState(''); 

  const fetchProjects = () => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => console.error("Помилка:", err));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProject = { title, description, teamName };

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      });

      if (response.ok) {
        setTitle(''); 
        setDescription('');
        setTeamName(''); 
        fetchProjects(); 
        alert("Збережено в базу!");
      }
    } catch (err) {
      alert("Сервер не відповідає");
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">🚀 Керування проєктами</h2>

      <div className="project-card form-card">
        <h3>Додати новий запис</h3>
        <form onSubmit={handleSubmit} className="add-project-form">
          <input 
            type="text" 
            placeholder="Назва проєкту (напр. AI Analyzer)" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required 
          />
          <input 
            type="text" 
            placeholder="Статус (напр. В розробці)" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required 
          />
          <input 
            type="text" 
            placeholder="Твоя команда (напр. Lviv Devs)" 
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required 
          />
          <button type="submit" className="save-btn">Зберегти в Firebase</button>
        </form>
      </div>

      <div className="projects-list">
        {!loading && projects.map((p) => (
          <div key={p.id} className="project-card">
            <div>
              <span className="nickname">{p.title}</span>,
              <span className="status"> Статус: <strong>{p.description}</strong></span>
            </div>
            <div className="project-team">
              Команда: {p.teamName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProjects;