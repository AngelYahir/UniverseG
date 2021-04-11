const { Router } = require('express');
const rutas = Router();


const {renderLogin, renderRegister, login, registro, salir, renderPerfil, renderUpdusr, updateUsr, renderCservice, sendMail, renderClaims} = require('../controllers/usuariosControl');
const {isAuthenticated} = require('../helpers/validacion');

rutas.get('/inicio', renderLogin);
rutas.post('/inicio', login);

rutas.get('/registro', renderRegister);
rutas.post('/registro', registro);

rutas.get('/salir', salir);

rutas.get('/perfil',isAuthenticated, renderPerfil);

rutas.get('/update/usuario', isAuthenticated, renderUpdusr);
rutas.post('/update/usuario', updateUsr);

rutas.get('/customer/service',isAuthenticated, renderCservice);
rutas.get('/customer/claims', renderClaims);
rutas.post('/customer/send/mail', sendMail);

module.exports = rutas;