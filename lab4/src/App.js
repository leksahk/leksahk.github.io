import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';

import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut 
} from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import Timer from './Timer';
import HackathonCard from './HackathonCard';
import ParticipantList from './ParticipantList';
import Results from './Results';
import './App.css';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const AuthSection = ({ onAuth, email, setEmail, password, setPassword }) => {
  const [isRegister, setIsRegister] = useState(false);
  
  return (
    <div className="auth-box">
      <h3>{isRegister ? "Реєстрація" : "Вхід"}</h3>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Пароль" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password" 
      />
      <div className="auth-buttons">
        <button onClick={() => onAuth(isRegister ? 'reg' : 'login')}>
          {isRegister ? "Зареєструватися" : "Увійти"}
        </button>
        <p onClick={() => {
          setIsRegister(!isRegister);
          setEmail('');    
          setPassword(''); 
          }} className="auth-toggle">
          {isRegister ? "Вже є акаунт? Увійти" : "Немає акаунта? Створити"}
        </p>
      </div>
    </div>
  );
};

function App() {
  const [activeFilters, setActiveFilters] = useState([]);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [competitions, setCompetitions] = useState([
    { id: 'l3_1', name: "AI Challenge", category: "AI", theme: "Штучний інтелект для екології", deadline: "22.03", fullDate: "March 22, 2026 23:59:59" },
    { id: 'l3_2', name: "Cyber Hack", category: "Cyber", theme: "Кібербезпека банківських систем", deadline: "25.03", fullDate: "March 25, 2026 23:59:59" },
    { id: 'l3_3', name: "Web Design Day", category: "Web", theme: "Адаптивні інтерфейси майбутнього", deadline: "01.04", fullDate: "April 01, 2026 23:59:59" }
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchFromFirebase = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "hackathons"));
        const fbData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        setCompetitions(prev => {
          const onlyNew = fbData.filter(newH => !prev.some(oldH => oldH.name === newH.name));
          return [...prev, ...onlyNew];
        });
      } catch (error) {
        console.error("Помилка завантаження бази:", error);
      }
    };
    fetchFromFirebase();
  }, []);

  const handleAuth = async (type) => {
    try {
      if (type === 'login') await signInWithEmailAndPassword(auth, email, password);
      else await createUserWithEmailAndPassword(auth, email, password);
      alert("Успішно!");
    } catch (e) { alert("Помилка: " + e.message); }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setEmail('');   
      setPassword(''); 
    } catch (e) {
      alert("Помилка при виході");
    }
  };

  const toggleFilter = (category) => {
    if (activeFilters.includes(category)) {
      setActiveFilters(activeFilters.filter(c => c !== category));
    } else {
      setActiveFilters([...activeFilters, category]);
    }
  };

  const filteredData = activeFilters.length === 0 
    ? competitions 
    : competitions.filter(h => activeFilters.includes(h.category));

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Hackathon Arena</h1>
          <nav className="navbar">
            <NavLink to="/">Змагання</NavLink> 
            <NavLink to="/participants">Учасники</NavLink>
            <NavLink to="/results">Результати</NavLink>
            <NavLink to="/my-projects">Мої проєкти</NavLink>
          </nav>
        </header>

        <main>
          <section className="user-auth-section">
            {!user ? (
              <AuthSection 
                onAuth={handleAuth} 
                email={email} setEmail={setEmail} 
                password={password} setPassword={setPassword} 
              />
            ) : (
              <div className="user-info-bar">
                <span>Ви увійшли як: <strong>{user.email}</strong></span>
                <button onClick={handleLogout}>Вийти</button>
              </div>
            )}
          </section>

          <Routes>
            <Route path="/" element={
              <div className="competitions">
                {competitions.length > 0 && <Timer deadline={competitions[0].fullDate || "March 30, 2026"} name={competitions[0].name} />}
                <div className="filters">
                  <button onClick={() => setActiveFilters([])} className={activeFilters.length === 0 ? 'active' : ''}>Всі</button>
                  {['AI', 'Web', 'Cyber'].map(cat => (
                    <button key={cat} onClick={() => toggleFilter(cat)} className={activeFilters.includes(cat) ? 'active' : ''}>
                      {cat} {activeFilters.includes(cat) ? '✓' : ''}
                    </button>
                  ))}
                </div>
                <div className="grid-container">
                  {filteredData.map(h => (
                    <HackathonCard 
                      key={h.id} 
                      title={h.name} 
                      category={h.category || "General"} 
                      rating={h.rating}
                      {...h} 
                    />
                  ))}
                </div>
              </div>
            } />
            <Route path="/participants" element={<ParticipantList />} />
            <Route path="/results" element={<Results />} />
            <Route path="/my-projects" element={
              user ? (
                <div className="page-container">
                  <h2>🚀 Твої персональні розробки</h2>
                  <div className="participant-card" style={{marginTop: '20px'}}>
                    <span className="nickname">Мій Хакатон Проєкт</span>
                    <span className="status">Статус: В розробці</span>
                  </div>
                </div>
              ) : (
                <div className="page-container auth-placeholder">
                  <div className="lock-icon">🔒</div>
                  <h2>Особистий простір розробника</h2>
                  <p>Цей розділ доступний лише авторизованим учасникам.</p>
                  <p className="sub-text">Будь ласка, увійдіть у свій акаунт, щоб переглянути власні проєкти та статистику.</p>
               </div>
              )
          } />
          </Routes>
        </main>

        <footer>
          <address>
            <p>Контакти: <a href="mailto:oleksandra.savchuk.oi.2024@lpnu.ua">oleksandra.savchuk.oi.2024@lpnu.ua</a></p>
            <p>Локація: м. Львів, Україна</p>
          </address>
          <p>&copy; 2026 Платформа Хакатонів</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;