const express = require('express');
const router = express.Router();
const EvaluacionController = require('../controllers/EvaluacionController');

router.get('/', (req, res) => {
    if (req.session.loggedin) {
        res.render('evaluacion', { nombre: req.session.nombre });
    } else {
        res.redirect('/inicio');
    }
});

router.post('/guardarEvaluacion', EvaluacionController.guardarEvaluacion);


module.exports = router;
