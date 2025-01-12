const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 3006;

app.use(express.static('public'));

app.get('/config', (req, res) => {
  res.json({ apiKey: process.env.APIKEY });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
