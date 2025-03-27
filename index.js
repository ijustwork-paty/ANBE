
// index.js

const express = require("express");
const cors = require('cors');
const sql = require('./db/conexion'); // Asegúrate de que esté bien configurado


const app = express();
app.use(cors());
app.use(express.json());

// Middleware para servir archivos estáticos
app.use(express.static("public"));

// Ruta principal
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Ruta para obtener grados
app.get('/api/grados', async (req, res) => {
    try {
        const result = await sql.query('SELECT nombre FROM Grados');
        res.json(result.recordset);
    } catch (error) {
        console.error("Error al obtener grados:", error);
        res.status(500).json({ message: 'Error al obtener grados' });
    }
});


// Levantar el servidor
app.listen(5000, () => {
    console.log('Servidor corriendo en http://localhost:5000');
});