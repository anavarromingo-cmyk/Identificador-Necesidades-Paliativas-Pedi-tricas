const express = require('express');
const fs = require('fs');
const path = require('path');

// Simple Express server to serve the dashboard and codes
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Endpoint to return the list of CIE‑10 patterns as JSON
app.get('/codes', (req, res) => {
  const codesPath = path.join(__dirname, 'cie10_codes.json');
  fs.readFile(codesPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'No se pudieron leer los códigos' });
    }
    try {
      const codes = JSON.parse(data);
      res.json(codes);
    } catch (e) {
      res.status(500).json({ error: 'Formato JSON no válido' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});