
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'database.json');

// Middleware para aceitar dados em JSON
app.use(express.json());

// Servir a sua pasta public (onde está o seu index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para o frontend buscar os dados guardados
app.get('/api/data', (req, res) => {
    try {
        if (!fs.existsSync(DB_FILE)) {
            fs.writeFileSync(DB_FILE, JSON.stringify({}));
        }
        const data = fs.readFileSync(DB_FILE, 'utf8');
        res.json(JSON.parse(data || '{}'));
    } catch (err) {
        res.status(500).json({ error: 'Erro ao ler os dados' });
    }
});

// Rota para o frontend salvar/atualizar os dados permanentemente
app.post('/api/data', (req, res) => {
    try {
        const newData = req.body;
        fs.writeFileSync(DB_FILE, JSON.stringify(newData, null, 2));
        res.json({ success: true, message: 'Dados salvos com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao salvar os dados' });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor a correr na porta ${PORT}`);
});
