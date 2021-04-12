const usuarioCtrl = {};
const usuario = require('../models/usuarios');
const passport = require('passport');
const nodemailer = require('nodemailer');

//Render vistas de usuario

usuarioCtrl.renderLogin = (req, res) => {
    res.render('inicio')
};

usuarioCtrl.renderRegister = (req, res) => {
    res.render('registro')
};

usuarioCtrl.renderPerfil = async (req, res) => {
  const perfil = await usuario.findOne({_id: req.user.id});
  const admin = await usuario.findOne({ $and: [{_id: req.user.id}, {admin: true}] });
  const employee = await usuario.findOne({ $and: [{_id: req.user.id}, {employee: true}] });
  const editor = await usuario.findOne({ $and: [{_id: req.user.id}, {editor: true}] });

  if(admin) {
    res.render('perfil', {admin});
  } else {
    if(employee) {
      res.render('perfil', {employee});
    } else {
      if(editor) {
        res.render('perfil', {editor});
      } else {
        if(perfil) {
          res.render('perfil', {perfil});
        }
      }
    }
  }
};

usuarioCtrl.renderUpdusr = async (req, res) => {
  const perfil = await usuario.findOne({_id: req.user.id});
  const admin = await usuario.findOne({ $and: [{_id: req.user.id}, {admin: true}] });
  const employee = await usuario.findOne({ $and: [{_id: req.user.id}, {employee: true}] });
  const editor = await usuario.findOne({ $and: [{_id: req.user.id}, {editor: true}] });

  if(admin) {
    res.render('editprof', {admin});
  } else {
    if(employee) {
      res.render('editprof', {employee});
    } else {
      if(editor) {
        res.render('editprof', {editor});
      } else {
        if(perfil) {
          res.render('editprof', {perfil});
        }
      }
    }
  }
};

//Registro de usuario

usuarioCtrl.registro = async(req, res) => {
  const errores = [];
  const {name, lastname, email, password, confirm_password} = req.body;
  if(password != confirm_password){
    errores.push({text: 'Passwords do not match, please double check or change password'});
  }
  const uemail = await usuario.findOne({email: email});
  if (uemail) {
    errores.push({text: 'The email is already in use'});
  }
  if (errores.length > 0) {
    res.render('registro', { 
      errores,
      name,
      lastname,
      email
    })
  } else {
    const nuevoUsuario = new usuario({name, lastname, email, password});
    nuevoUsuario.password = await nuevoUsuario.encriptar(password);
    await nuevoUsuario.save();
    req.flash('mensaje', 'Account created successfully please login');
    res.redirect('inicio');
  }
 
};

usuarioCtrl.updateUsr = async (req, res) => {
  const {name, lastname, email, actualpass} = req.body;
  const actualusr = await usuario.findById(req.user.id);
  const coincidencia = await actualusr.compararPassword(actualpass);


  if(coincidencia) {
    await usuario.findByIdAndUpdate({_id: req.user.id}, {
      name,
      lastname,
      email,
    });
    req.flash('mensaje', 'User updated successfully, please log in again');
    res.redirect('/salir');
  } else {
    req.flash('error', 'Incorrect password');
    res.redirect('/update/usuario')
  }
};

//login passport
usuarioCtrl.login = passport.authenticate('local', {
  failureRedirect: 'inicio',
  successRedirect: '/',
  failureFlash: true
});

//Eliminar sesion 
usuarioCtrl.salir = (req, res) => {
  req.logout();
  req.flash('mensaje', 'LogOut');
  res.redirect('inicio');
};



//customer services

usuarioCtrl.renderCservice = async (req, res) => {
  const usr = await usuario.findOne({_id: req.user.id});

  res.render('tienda/cservice', {usr});
};

usuarioCtrl.sendMail = async (req, res) => {
  const {email, name, asunto, mensaje} = req.body;

  contentHTML = `
      <h1>User Information</h1>
      <ul>
          <li>Username: ${name}</li>
          <li>User Email: ${email}</li>
          <li>Issue: ${asunto}</li>
      </ul>
      <p>${mensaje}</p>
  `;

  let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
          user: 'olin.rath29@ethereal.email',
          pass: 'nZJb3bpDt72hdNPbf7'
      },
      tls: {
          rejectUnauthorized: false
      }
  });

  let info = await transporter.sendMail({
      from: '"Universe Games" <olin.rath29@ethereal.email>', // sender address,
      to: 'olin.rath29@ethereal.email',
      subject: 'Universe Games Customer Service',
      html: contentHTML
  });

  console.log('Message sent: %s', info.messageId);

  req.flash('mensaje', 'Thanks for letting us know your problems, a Universe games manager will contact you :)');
  res.redirect('/');

}

usuarioCtrl.renderClaims = (req, res) => {
  res.render('tienda/claims');
}

module.exports = usuarioCtrl;
