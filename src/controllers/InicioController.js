const bcrypt = require('bcrypt');


function inicio(req, res) {
    if(req.session.loggedin != true){
  res.render('inicio/index');
    }else {
        res.redirect('/'); 
    }
}

function auth(req, res) {
    const data = req.body;

    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM users WHERE email = ?', [data.email], (err, userdata) => {

            if (userdata.length > 0){ 

                userdata.forEach(element => {
                    bcrypt.compare(data.contrasena, element.contrasena, (err, esIgual) => {
                    
                        if(!esIgual){
                        res.render('inicio/index', {error: 'La contraseña es incorrecta'});
                        }else{
                            req.session.loggedin = true;
                            req.session.nombre = element.nombre;

                            res.redirect('/'); 
                        
                        }                        
                    });
                });                   
                                          
            }else{
                res.render('inicio/index', {error: 'El usuario no existe'});
            }
        });
    });
}
          
            
function registro(req, res) {
      if(req.session.loggedin != true){

        res.render('inicio/registro');

    }else {
        res.redirect('/'); 
    }
}

function storeUser (req, res){
    const data = req.body;

    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM users WHERE email = ?', [data.email], (err, userdata) => {
            if (userdata.length > 0){
               res.render('inicio/registro', {error: 'El usuario ya existe'
                });                
            }else{
                bcrypt.hash(data.contrasena, 12).then(hash => {
                    data.contrasena = hash;

                    req.getConnection((err, conn) => {
                        conn.query('INSERT INTO users SET ?', [data], (err, rows) => {

                            req.session.loggedin = true;
                            req.session.nombre = data.nombre;

                            res.redirect('/');
                        });
                    });
                });
            }
        })
    })
}

function  logout(req, res) {
    if(req.session.loggedin == true){

        req.session.destroy();

    }else{
        res.redirect('/inicio'); 
    }
}             
      
module.exports = {
    inicio,
    registro,
    storeUser,
    auth,
    logout
}