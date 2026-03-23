import React from 'react';

const ParticipantList = () => {
  const participants = [
    { id: 1, nickname: "AlexDev", role: "Frontend", team: "Alpha" },
    { id: 2, nickname: "Kate", role: "Design", team: "Alpha" },
    { id: 3, nickname: "Max", role: "Backend", team: "Beta" },
    { id: 4, nickname: "Julia", role: "QA", team: "Beta" }
  ];

  return (
    <div className="page-container">
      <h2 className="page-title">Список учасників</h2>
      <div className="participants-list">
        {participants.map(p => (
          <div key={p.id} className="participant-card">
            <span className="nickname">{p.nickname}</span>
            <span className="role">{p.role}</span>
            <span className="team-name">{p.team}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantList;