const adminCtrl = {};
const usuario = require('../models/usuarios');
const cloudinary = require('cloudinary');
const productos = require('../models/productos');
const fs = require('fs-extra');
const generos = require('../models/generos');
const idiomas = require('../models/idiomas');

//config cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
}); 


//vistas administrador/empleado
adminCtrl.renderEmployees = async (req, res) => {
    const admin = await usuario.findOne({ $and: [{_id: req.user.id}, {admin: true}] });
    const empleados = await usuario.find({$or: [{employee: true}, {editor: true} ] });
    const usuarios = await usuario.find();
    const admins = await usuario.find({admin: true});
    if (admin) {
      res.render('actions/admin_employee/employees', {
        empleados,
        usuarios,
        admins
      });
    } else {
      req.flash('error', 'The requested path does not exist')
      res.redirect('/');
    }
};


adminCtrl.renderProductos = async (req, res) => {
  const productoz = await productos.find();
  const pass = await usuario.findOne({ $and: [ {_id: req.user.id}, { $or: [ {admin: true}, {employee: true} ] } ] });
  if (pass) {
    res.render('actions/admin_employee/products', {productoz, pass});
  } else {
    req.flash('error', 'The requested path does not exist');
    res.redirect('/inicio');
  }  
};

adminCtrl.renderAddprod = async(req, res) => {
  const pass1 = await usuario.findOne({ $and: [ {_id: req.user.id}, { $or: [ {admin: true}, {employee: true} ] } ] });
  const genero = await generos.find();
  const idioma = await idiomas.find();
  
  if (pass1) {
    res.render('actions/admin_employee/addprod', {pass1, genero, idioma});
  } else {
    req.flash('error', 'The requested path does not exist');
    res.redirect('/inicio');
  }
};

adminCtrl.renderEdit = async(req, res) => {
  const {id} = req.params;
  const pass = await usuario.findOne({ $and: [ {_id: req.user.id}, { $or: [ {admin: true}, {employee: true} ] } ] });
  const producto = await productos.findOne({_id: id});
  const genero = await generos.find();
  const idioma = await idiomas.find();
  
  if (pass) {
    res.render('actions/admin_employee/editprod', {pass, producto, idioma, genero});
  } else {
    req.flash('error', 'The requested path does not exist');
    res.redirect('/perfil');
  }
};


//acciones administrador/empleado
adminCtrl.addProduct = async (req, res) => {
  const {product, description, genre, discount, price, sale, premiere, trailer, developer, editora, esrb, wos, wli, wapp, fulldesc, mos, mproc, mgpu, mram, mstorage, ros, rproc, rgpu, rram, rstorage, lang, ocraiting, recomendation, average, urloc} = req.body;
  const result = await cloudinary.v2.uploader.upload(req.file.path);
  const employee = await usuario.findOne({_id: req.user.id});

  const newprice = (price*discount)/100;


  const nuevoProducto = new productos({
    product,
    description,
    genre,
    price,
    employee: employee.name,
    discount,
    newprice,
    sale,
    premiere,
    image: result.url,
    public_id: result.public_id,
    trailer,
    developer,
    editora,
    esrb,
    wos,
    wli,
    wapp,
    fulldesc,
    espmin: {
      mos,
      mproc,
      mgpu,
      mram,
      mstorage,
    },
    esprec: {
      ros,
      rproc,
      rgpu,
      rram,
      rstorage,
    },
    lang,
    review: {
      recomendation,
      average,
      urloc
    },
    ocraiting
    

  });

  await nuevoProducto.save();
  await fs.unlink(req.file.path);
  res.redirect('/perfil');
};

adminCtrl.deleteProduct = async (req, res) => {
  const {id} = req.params;
  const producto = await productos.findByIdAndDelete(id);
  await cloudinary.v2.uploader.destroy(producto.public_id);

  res.redirect('/perfil');
};


adminCtrl.addEmployee = async (req, res) => {
  const errores = [];
  const {admin, employee, editor, email} = req.body;
  const uemail = await usuario.findOne({email: email});

  if(uemail) {
    errores.push({text: 'The email is already in use, try another'});
  }
  if(errores.length > 0) {
    res.render('actions/admin_employee/employees');
  } else {
    const nuevoUsuario = new usuario({
      name: 'New',
      lastname: 'Employee',
      email,
      password: 'password',
      admin,
      employee,
      editor
    });
    nuevoUsuario.password = await nuevoUsuario.encriptar('password');
    await nuevoUsuario.save();
    req.flash('mensaje', 'New employee added successfully');
    res.redirect('/list/empleados')
  }
};

adminCtrl.addGenre = async (req, res) => {
  const { genero } = req.body;
  const nuevoGenero = new generos({genero});

  await nuevoGenero.save();
  req.flash('mensaje', 'New genre added successfully');
  res.redirect('/add/productos')
};

adminCtrl.addLanguage = async (req, res) => {
  const {language} = req.body;
  const nuevoIdioma = new idiomas({language});

  await nuevoIdioma.save();
  req.flash('mensaje', 'New language added successfully');
  res.redirect('/add/productos');
};

adminCtrl.deleteEmployee = async (req, res) => {
  const {id} = req.params;
  await usuario.findByIdAndDelete(id);

  res.redirect('/perfil');
};

adminCtrl.editProduct = async (req, res) => {
  const {id} = req.params;
  const {product, description, genre, discount, price, sale, premiere, trailer, developer, editora, esrb, wos, wli, wapp, fulldesc, mos, mproc, mgpu, mram, mstorage, ros, rproc, rgpu, rram, rstorage, lang, ocraiting, recomendation, average, urloc} = req.body;
  const employee = await usuario.findOne({_id: req.user.id});

  const newprice = (price*discount)/100;


  await productos.findOneAndUpdate({_id: id}, {
    product,
    description,
    genre,
    price,
    employee: employee.name,
    discount,
    newprice,
    sale,
    premiere,
    trailer,
    developer,
    editora,
    esrb,
    wos,
    wli,
    wapp,
    fulldesc,
    espmin: {
      mos,
      mproc,
      mgpu,
      mram,
      mstorage,
    },
    esprec: {
      ros,
      rproc,
      rgpu,
      rram,
      rstorage,
    },
    lang,
    review: {
      recomendation,
      average,
      urloc
    },
    ocraiting
  });

  res.redirect('/list/productos');
};



module.exports = adminCtrl;
