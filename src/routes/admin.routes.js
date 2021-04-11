const {isAuthenticated} = require('../helpers/validacion');
const { Router } = require('express');
const rutas = Router();

const {renderEmployees, addEmployee, addProduct, deleteProduct, deleteEmployee, renderProductos, renderAddprod, addGenre, addLanguage, editProduct, renderEdit} = require('../controllers/adminControl');

rutas.get('/list/empleados',isAuthenticated, renderEmployees);
rutas.get('/list/empleados/:id', deleteEmployee);
rutas.post('/add/empleados', addEmployee);
rutas.post('/add/genero', addGenre);
rutas.post('/add/idioma', addLanguage);

rutas.get('/list/productos', isAuthenticated, renderProductos);
rutas.get('/add/productos', isAuthenticated, renderAddprod);
rutas.post('/add/productos', addProduct);
rutas.get('/list/productos/delproducto/:id', deleteProduct);
rutas.get('/list/productos/editproducto/:id', isAuthenticated, renderEdit);
rutas.post('/list/productos/editproducto/:id', editProduct);

module.exports = rutas;
