const control = {};
const productos = require('../models/productos');
const noticia = require('../models/noticias');

//Renderiza las vistas 
control.renderIndex = async(req, res) => {
    const producto = await productos.find().sort({ date: "desc" }).limit(3);
    const estrenos = await productos.find({premiere: true}).sort({ date: "desc" }).limit(4);
    const ofertas = await productos.find({sale: true}).sort({ date: "desc" }).limit(5);
    const noticias = await noticia.find().sort({ date: "desc" });

    res.render('index', {producto, estrenos, ofertas, noticias});
};


//Exporta la funcion para que sea accesible desde el archivo de rutas
module.exports = control;