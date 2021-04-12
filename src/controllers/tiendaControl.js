const tiendaCtrl = {};
const productos = require('../models/productos');
const noticia = require('../models/noticias');

//Renderizar vistas de la tienda

tiendaCtrl.renderTienda = async (req, res) => {
    const producto = await productos.find().sort({ updatedAt: -1 });
    res.render('tienda/productos', {producto});
};

tiendaCtrl.renderProdpage = async (req, res) => {
    const {id} = req.params;
    const producto = await productos.findById(id);
    const oferta = await productos.find({ $and: [{_id: id}, {sale: true}] });

    //Raiting Open Critics
    const m = await productos.find({ $and: [{_id: id}, {ocraiting: 'MIGHTY'}]});
    const f = await productos.find({ $and: [{_id: id}, {ocraiting: 'FAIR'}]});
    const s = await productos.find({ $and: [{_id: id}, {ocraiting: 'STRONG'}]});
    const w = await productos.find({ $and: [{_id: id}, {ocraiting: 'WEAK'}]});

    //Plataforma
    const mac = await productos.find({ $and: [{_id: id}, {wapp: true}]});
    const linux = await productos.find({ $and: [{_id: id}, {wli: true}]});
    const windows = await productos.find({ $and: [{_id: id}, {wos: true}]});

    //esrb
    const e = await productos.find({ $and: [{_id: id}, {esrb: 'Todos'}]});
    const e10 = await productos.find({ $and: [{_id: id}, {esrb: 'Todos +10'}]});
    const teen = await productos.find({ $and: [{_id: id}, {esrb: 'Adolescentes'}]});
    const mature = await productos.find({ $and: [{_id: id}, {esrb: 'Maduro +17'}]});
    const adults = await productos.find({ $and: [{_id: id}, {esrb: 'Solo Adultos +18'}]});
    const rp = await productos.find({ $and: [{_id: id}, {esrb: 'Sin clasificar'}]});

    const key = process.env.API_STRIPE_publicable;

    res.render('tienda/producto', {producto, oferta, m, s, f, w, mac, linux, windows, e, e10, teen, mature, adults, rp, key});
};


tiendaCtrl.renderSearch = async (req, res) => {
    const search = req.body.search;
    const producto = await productos.find({product: new RegExp(search, 'i')}).sort({ updatedAt: -1 });

    if(producto.length > 0) {
        res.render('tienda/productos', {producto});
    } else {
        req.flash('error', 'No product was found');
        res.redirect('/tienda/productos');
    }
}

tiendaCtrl.renderlNoticias = async (req, res) => {
    const noticias = await noticia.find().sort({ updatedAt: -1 });
    res.render('noticias/noticias', {noticias});
}

tiendaCtrl.renderNoticia = async (req, res) => {
    const {id} = req.params;
    const nota = await noticia.findOne({_id: id});
    res.render('noticias/noticia', {nota});
}

tiendaCtrl.renderSearchnot = async (req, res) => {
    const search = req.body.search;
    const noticias = await noticia.find({titulo: new RegExp(search, 'i')}).sort({ updatedAt: -1 });

    if(noticias.length > 0) {
        res.render('noticias/noticias', {noticias});
    } else {
        req.flash('error', 'No news found');
        res.redirect('/tienda/noticias');
    }
}

tiendaCtrl.renderOfertas = async (req, res) => {
    const producto = await productos.find({sale: true}).sort({ updatedAt: -1 });
    res.render('tienda/productos', {producto});
};

tiendaCtrl.renderEstrenos = async (req, res) => {
    const producto = await productos.find({premiere: true}).sort({ updatedAt: -1 });
    res.render('tienda/productos', {producto});
};

//stripe

tiendaCtrl.renderCompra =  (req, res) => {
    res.render('tienda/compra');
}


module.exports = tiendaCtrl;