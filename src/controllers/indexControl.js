const control = {};
const productos = require('../models/productos');
const noticia = require('../models/noticias');

//Renderiza las vistas 
control.renderIndex = async(req, res) => {
    const producto = await productos.find().sort({ updatedAt: -1 }).limit(3);
    const estrenos = await productos.find({premiere: true}).sort({ updatedAt: -1 }).limit(4);
    const ofertas = await productos.find({sale: true}).sort({ updatedAt: -1 }).limit(5);
    const noticias = await noticia.find().sort({ updatedAt: -1 });

    res.render('index', {producto, estrenos, ofertas, noticias});
};


//Exporta la funcion para que sea accesible desde el archivo de rutas
module.exports = control;