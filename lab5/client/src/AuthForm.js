import React, { useState } from 'react';

const AuthForm = ({ handleAuth }) => {
  const [isRegister, setIsRegister] = useState(false); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const type = isRegister ? 'register' : 'login';
    handleAuth(type, email, password);
  };

  return (
    <div className="auth-container">
      <h2>{isRegister ? 'Реєстрація на хакатон' : 'Вхід у систему'}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input 
          type="email" 
          placeholder="Електронна пошта" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Пароль" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">
          {isRegister ? 'Зареєструватися' : 'Увійти'}
        </button>
      </form>
      
      <p onClick={() => setIsRegister(!isRegister)} className="toggle-auth">
        {isRegister ? 'Вже маєте акаунт? Увійдіть' : 'Ще не зареєстровані? Створіть акаунт'}
      </p>
    </div>
  );
};

export default AuthForm;