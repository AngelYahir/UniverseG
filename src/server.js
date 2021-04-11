const express = require('express');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const flash = require('connect-flash');
const { v4: uuid } = require('uuid');
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const app = express();
const passport = require('passport');
require('./config/passport');


//configuracion para puerto
//Busca un puerto, si no hay uno utiliza el puertos 4000 (puede cambiarse a cualquier puerto)
app.set('port', process.env.PORT || 4000);

//Establece donde se encuentra la carpeta vistas usando path para no tener problemas en concatenar el nombre de la carpeta
app.set('views', path.join(__dirname, 'views'));

//Configuracion de handlebars paramanejar plantillas
//layouts son codigos comunes como el head html y scripts
//partials son fragmentos de codigo que se pueden usar en las partes que se necesiten
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    handlebars: handlebars
}));

//establece que motor de plantillas se utilizara
app.set('view engine', '.hbs');



//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(morgan('dev'));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, uuid() + path.extname(file.originalname));
    }
});

app.use(multer({storage}).single('image'));


//connect-flash
app.use((req, res, next) =>{
  res.locals.mensaje_error = req.flash('mensaje_error');
  res.locals.mensaje = req.flash('mensaje');
  res.locals.error = req.flash('error');
  res.locals.advertencia = req.flash('advertencia');
  res.locals.usuario = req.user || null;
  next();
});

//Rutas
app.use(require('./routes/index.routes'));
app.use(require('./routes/usuarios.routes'));
app.use(require('./routes/admin.routes'));
app.use(require('./routes/tienda.routes'));
app.use(require('./routes/editor.routes'));




//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));


//stripe

const stripe = require('stripe')('sk_test_51IPd6xG3jRLaAqrO4Jpfda1PEG22AJdWMCBOZbtJAwPKNn5OKCnLXv19UHuEOi7RWbsafkmyf0ekK89vNh1ROuw900yaW19gbL');
app.use(express.static('.'));
const YOUR_DOMAIN = 'http://localhost:4000s';
app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Stubborn Attachments',
            images: ['https://i.imgur.com/EHyR2nP.png'],
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });
  res.json({ id: session.id });
});
app.listen(4242, () => console.log('Running on port 4242'));



module.exports = app;
