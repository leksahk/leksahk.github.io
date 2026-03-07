import React from 'react';

const ParticipantList = () => {
  const participants = [
    { id: 1, nickname: "AlexDev", role: "Frontend", team: "Alpha" },
    { id: 2, nickname: "Kate", role: "Design", team: "Alpha" },
    { id: 3, nickname: "Max", role: "Backend", team: "Beta" },
    { id: 4, nickname: "Julia", role: "QA", team: "Beta" }
  ];

  return (
    <div className="participants-page">
      <h2>Список учасників</h2>
      <table className="participants-table">
        <thead>
          <tr>
            <th>Нікнейм</th>
            <th>Роль</th>
            <th>Команда</th>
          </tr>
        </thead>
        <tbody>
          {participants.map(p => (
            <tr key={p.id}>
              <td>{p.nickname}</td>
              <td>{p.role}</td>
              <td>{p.team}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipantList;