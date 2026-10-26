const express = require('express');

const app = express();
const PORT = 5010;

// Middleware para interpretar solicitudes JSON
app.use(express.json());

// Datos de ejemplo
let usuarios = [
    { id: 1, nombre: 'Byron', email: 'byron@example.com' },
    { id: 2, nombre: 'Ana', email: 'ana@example.com' }
];

// Endpoint GET: consultar todos los usuarios
app.get('/api/usuarios', (req, res) => {
    res.json(usuarios);
});

// Endpoint GET: consultar un usuario por ID
app.get('/api/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id === Number(req.params.id));

    if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(usuario);
});

// Endpoint POST: crear un usuario
app.post('/api/usuarios', (req, res) => {
    const { nombre, email } = req.body;

    if (!nombre || !email) {
        return res.status(400).json({
            error: 'El nombre y el email son obligatorios'
        });
    }

    const nuevoUsuario = {
        id: usuarios.length
            ? Math.max(...usuarios.map(u => u.id)) + 1
            : 1,
        nombre,
        email
    };

    usuarios.push(nuevoUsuario);

    res.status(201).json(nuevoUsuario);
});

// Endpoint DELETE: eliminar un usuario
app.delete('/api/usuarios/:id', (req, res) => {
    const id = Number(req.params.id);
    const indice = usuarios.findIndex(u => u.id === id);

    if (indice === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    usuarios.splice(indice, 1);

    res.status(204).send();
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`API disponible en http://localhost:${PORT}`);
});