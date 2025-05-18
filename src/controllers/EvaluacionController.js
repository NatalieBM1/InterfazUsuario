function guardarEvaluacion(req, res) {
    const {
        programa,
        infraestructura,
        docentes,
        servicios,
        satisfaccion,
        comentarios
    } = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(500).send('Error de conexión a la base de datos');
        }

        const evaluacion = {            
            programa: programa,
            infraestructura: infraestructura,
            docentes: docentes,
            servicios: servicios,
            satisfaccion: satisfaccion,
            comentarios: comentarios
        };

        conn.query('INSERT INTO evaluaciones SET ?', [evaluacion], (err, result) => {
            if (err) {
                console.error('Error al guardar evaluación:', err);
                return res.status(500).send('Error al guardar evaluación');
            }

            res.render('home', { nombre: req.session.nombre, exito: '¡Gracias por tu evaluación!' });
        });
    });
}

module.exports = {
    guardarEvaluacion
};
