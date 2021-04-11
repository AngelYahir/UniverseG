//Requerimor la funcion "Router" para enrutar de express
const { Router } = require('express');
const rutas = Router();

//Requerimos las rutas desde el archivo de control asi reducimos el codigo
const {renderIndex} = require('../controllers/indexControl');


rutas.get('/', renderIndex);


module.exports = rutas;