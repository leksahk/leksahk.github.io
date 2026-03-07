import React, { useState, useEffect } from 'react';

const Timer = ({ deadline, name }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timerId = setInterval(() => {
      const now = new Date().getTime();
      const targetDate = new Date(deadline).getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft(`Змагання ${name} розпочато!`);
        clearInterval(timerId);
        return;
      }

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`До завершення ${name}: ${d}д ${h}г ${m}хв ${s}с`);
    }, 1000);

    return () => clearInterval(timerId);
  }, [deadline, name]);

  return (
    <div id="hackathon-timer">
      <span>{timeLeft || "Завантаження..."}</span>
    </div>
  );
};

export default Timer;