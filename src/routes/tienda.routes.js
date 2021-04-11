const { Router } = require('express');
const rutas = Router();

const {renderTienda, renderProdpage, renderSearch, renderlNoticias, renderNoticia, renderSearchnot, renderOfertas, renderEstrenos, renderCompra} = require('../controllers/tiendaControl');

rutas.get('/tienda/productos', renderTienda);
rutas.get('/tienda/ofertas', renderOfertas);
rutas.get('/tienda/estrenos', renderEstrenos);
rutas.get('/tienda/producto/:id', renderProdpage);

rutas.post('/buscar', renderSearch);

rutas.get('/tienda/noticias', renderlNoticias);
rutas.get('/tienda/noticia/:id', renderNoticia);
rutas.post('/buscar/noticia', renderSearchnot);


rutas.get('/compra/realizada', renderCompra);




module.exports = rutas;