const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ClassGestDB',
    password: '12345678',
    port: 5432
});

const validarTexto = (texto) => {
    return typeof texto === 'string' && texto.trim().length > 0;
};

app.get('/', (req, res) => {
    res.json({ mensaje: 'API funcionando correctamente' });
});

app.get('/estudiantes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM estudiantes');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/estudiantes/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'SELECT * FROM estudiantes WHERE id_estudiante = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/estudiantes', async (req, res) => {
    try {
        const { nombre, apellido, edad, grado } = req.body;

        if (!validarTexto(nombre) || isNaN(edad)) {
            return res.status(400).json({ mensaje: 'Datos inválidos' });
        }

        const result = await pool.query(
            `INSERT INTO estudiantes (nombre, apellido, edad, grado)
             VALUES ($1,$2,$3,$4) RETURNING *`,
            [nombre, apellido, edad, grado]
        );

        res.json({ mensaje: 'Estudiante creado', data: result.rows[0] });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/estudiantes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, edad, grado } = req.body;

        const result = await pool.query(
            `UPDATE estudiantes
             SET nombre=$1, apellido=$2, edad=$3, grado=$4
             WHERE id_estudiante=$5 RETURNING *`,
            [nombre, apellido, edad, grado, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: 'No encontrado' });
        }

        res.json({ mensaje: 'Actualizado', data: result.rows[0] });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/estudiantes/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'DELETE FROM estudiantes WHERE id_estudiante=$1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: 'No encontrado' });
        }

        res.json({ mensaje: 'Eliminado correctamente' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/profesores', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM profesores');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/profesores/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'SELECT * FROM profesores WHERE id_profesor = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Profesor no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/profesores', async (req, res) => {
    try {
        const { nombre, apellido, edad } = req.body;

        if (!validarTexto(nombre) || !validarTexto(apellido)) {
            return res.status(400).json({ mensaje: 'Datos inválidos' });
        }

        const result = await pool.query(
            `INSERT INTO profesores (nombre, apellido, edad)
             VALUES ($1,$2,$3) RETURNING *`,
            [nombre, apellido, edad]
        );

        res.json(result.rows[0]);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/profesores/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, edad } = req.body;

        const result = await pool.query(
            `UPDATE profesores
             SET nombre=$1, apellido=$2, edad=$3
             WHERE id_profesor=$4 RETURNING *`,
            [nombre, apellido, edad, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: 'No encontrado' });
        }

        res.json(result.rows[0]);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/profesores/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'DELETE FROM profesores WHERE id_profesor=$1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: 'No encontrado' });
        }

        res.json({ mensaje: 'Profesor eliminado' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/cursos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cursos');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/cursos/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'SELECT * FROM cursos WHERE id_curso = $1',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Curso no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/cursos', async (req, res) => {
    try {
        const { id_horario, nombre, descripcion } = req.body;

        if (!validarTexto(nombre)) {
            return res.status(400).json({ mensaje: 'Nombre inválido' });
        }

        const result = await pool.query(
            `INSERT INTO cursos (id_horario, nombre, descripcion)
             VALUES ($1,$2,$3) RETURNING *`,
            [id_horario, nombre, descripcion]
        );

        res.json(result.rows[0]);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/cursos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { id_horario, nombre, descripcion } = req.body;

        const result = await pool.query(
            `UPDATE cursos
             SET id_horario=$1, nombre=$2, descripcion=$3
             WHERE id_curso=$4 RETURNING *`,
            [id_horario, nombre, descripcion, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: 'No encontrado' });
        }

        res.json(result.rows[0]);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/cursos/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'DELETE FROM cursos WHERE id_curso=$1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: 'No encontrado' });
        }

        res.json({ mensaje: 'Curso eliminado' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/matriculas', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT m.*, e.nombre as estudiante, c.nombre as curso
            FROM matriculas m
            JOIN estudiantes e ON m.id_estudiante = e.id_estudiante
            JOIN cursos c ON m.id_curso = c.id_curso
        `);

        res.json(result.rows);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/matriculas', async (req, res) => {
    try {
        const { id_estudiante, id_profesor, id_curso } = req.body;

        if (!id_estudiante || !id_curso) {
            return res.status(400).json({ mensaje: 'Datos incompletos' });
        }

        const result = await pool.query(
            `INSERT INTO matriculas (id_estudiante, id_profesor, id_curso)
             VALUES ($1,$2,$3) RETURNING *`,
            [id_estudiante, id_profesor, id_curso]
        );

        res.json(result.rows[0]);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/matriculas/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'DELETE FROM matriculas WHERE id_matricula=$1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: 'No encontrado' });
        }

        res.json({ mensaje: 'Matrícula eliminada' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});