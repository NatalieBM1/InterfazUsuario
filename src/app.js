const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const inicioRoutes = require('./routes/inicio');
const evaluacionRoutes = require('./routes/evaluacion');




const app = express();
app.set('port', 4000);

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
    extname: '.hbs'    
}));
app.set('view engine', 'hbs'); 

app.use(bodyParser.urlencoded({ 
    extended: true 
}));

app.use(bodyParser.json());

app.use(myconnection(mysql, {
    host:'localhost',
    user:'root',   
    password:'',
    port:3307,
    database:'loginuser'
}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.listen(app.get('port'), () => {
    console.log('Listening on port ', app.get('port'));
    });

app.use ('/', inicioRoutes);

app.use('/evaluacion', evaluacionRoutes);

app.get('/', (req, res) => {
    if(req.session.loggedin == true){
    
        res.render('home', {nombre: req.session.nombre});
    
    }else {
        res.redirect('/inicio'); 
    }   
});

