const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const path = require('path');

const app = express();

// --- НАЛАШТУВАННЯ (Middleware) ---
app.use(cors()); // Дозволяємо запити з твого React-додатка
app.use(express.json()); // Дозволяємо серверу розуміти JSON-дані в POST-запитах

// --- 1. ПІДКЛЮЧЕННЯ FIREBASE (Пункт 2 методички) ---
// Файл serviceAccountKey.json має лежати в папці server поруч із цим файлом!
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// --- 2. GET: ОТРИМАННЯ ЗАЯВОК (Пункт 3 методички) ---
// Отримуємо проєкти, відфільтровані/відсортовані за датою створення
app.get('/api/projects', async (req, res) => {
  try {
    const projectsRef = db.collection('user_projects');
    // Сортуємо за полем 'createdAt' у порядку спадання (спочатку нові)
    const snapshot = await projectsRef.orderBy('createdAt', 'desc').get();
    
    if (snapshot.empty) {
      return res.status(200).json([]);
    }

    const projects = [];
    snapshot.forEach(doc => {
      projects.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(projects);
  } catch (error) {
    console.error("Помилка GET:", error);
    res.status(500).send("Помилка при отриманні даних: " + error.message);
  }
});

// --- 3. POST: ЗБЕРЕЖЕННЯ ЗАЯВКИ (Пункт 4 методички) ---
// Приймає дані від React і зберігає в Firestore
app.post('/api/projects', async (req, res) => {
  try {
    const { title, description, teamName } = req.body;

    const newProject = {
      title,
      description,
      teamName,
      createdAt: admin.firestore.FieldValue.serverTimestamp() // Автоматична дата сервера
    };

    const docRef = await db.collection('user_projects').add(newProject);
    res.status(201).json({ id: docRef.id, ...newProject });
  } catch (error) {
    console.error("Помилка POST:", error);
    res.status(500).send("Помилка при збереженні: " + error.message);
  }
});

// --- 4. ХОСТИНГ СТАТИЧНИХ ФАЙЛІВ (Пункт 1 методички) ---
// Коли зробиш 'npm run build' у папці client, сервер буде роздавати готовий сайт
app.use(express.static(path.join(__dirname, '../client/build')));

// Це дозволяє React Router працювати правильно (віддає index.html на будь-який шлях)
// Ми використовуємо регулярний вираз /.*/ замість тексту '*'
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// --- ЗАПУСК СЕРВЕРА ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
  🚀 Node.js сервер запущено!
  📡 API доступне за адресою: http://localhost:${PORT}/api/projects
  📂 Статичні файли: папка client/build
  `);
});