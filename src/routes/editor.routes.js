const {isAuthenticated} = require('../helpers/validacion');
const { Router } = require('express');
const rutas = Router();

const {renderNoticias, renderaddNoticias, renderEditnot, addNoticia, deleteNoticia, editNoticia} = require('../controllers/editorControl');

rutas.get('/list/noticias', isAuthenticated, renderNoticias);
rutas.get('/edit/noticia/:id', isAuthenticated, renderEditnot);
rutas.post('/edit/noticia/:id', editNoticia);
rutas.get('/delet/noticia/:id', deleteNoticia);

rutas.post('/add/noticias', addNoticia);
rutas.get('/add/noticias', isAuthenticated, renderaddNoticias);



module.exports = rutas;