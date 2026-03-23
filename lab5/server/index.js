const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const path = require('path');

const app = express();

app.use(cors()); 
app.use(express.json()); 

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.get('/api/projects', async (req, res) => {
  try {
    const projectsRef = db.collection('user_projects');
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
    res.status(500).json({ error: "Помилка при отриманні даних" });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const { title, description, teamName } = req.body;

    const newProject = {
      title,
      description,
      teamName,
      createdAt: admin.firestore.FieldValue.serverTimestamp() 
    };

    const docRef = await db.collection('user_projects').add(newProject);
    res.status(201).json({ id: docRef.id, ...newProject });
  } catch (error) {
    console.error("Помилка POST:", error);
    res.status(500).json({ error: "Помилка при збереженні" });
  }
});

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
  Сервер успішно запущено на порту ${PORT}
  `);
});