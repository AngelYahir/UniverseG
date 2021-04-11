const editorCtrl = {};
const usuario = require('../models/usuarios');
const cloudinary = require('cloudinary');
const noticia = require('../models/noticias');
const fs = require('fs-extra');

//vistas editor
editorCtrl.renderNoticias = async (req, res) => {
    const noticias = await noticia.find().sort({date: "desc"});
    const pass3 = await usuario.findOne({ $and: [ {_id: req.user.id}, { $or: [ {admin: true}, {employee: true},{editor: true} ] } ] });
    if (pass3) {
      res.render('actions/admin_employee/noticias', {noticias, pass3});
    } else {
      req.flash('error', 'The requested path does not exist');
      res.redirect('/inicio');
    }  
};

editorCtrl.renderaddNoticias = async (req, res) => {
    const pass4 = await usuario.findOne({ $and: [ {_id: req.user.id}, { $or: [ {admin: true}, {employee: true},{editor: true} ] } ] });
    if (pass4) {
      res.render('actions/admin_employee/addnoticias', {pass4});
    } else {
      req.flash('error', 'The requested path does not exist');
      res.redirect('/inicio');
    }  
};

editorCtrl.renderEditnot = async (req, res) => {
    const {id} = req.params;
    const ednoticia = await noticia.findOne({_id: id});
    const pass5 = await usuario.findOne({ $and: [ {_id: req.user.id}, { $or: [ {admin: true}, {employee: true},{editor: true} ] } ] });
    if (pass5) {
      res.render('actions/admin_employee/editnoticia', {pass5, ednoticia});
    } else {
      req.flash('error', 'The requested path does not exist');
      res.redirect('/inicio');
    } 
}



//acciones editor
editorCtrl.addNoticia = async (req, res) => {
    const {titulo, tema, contenido, resumen} = req.body;
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const employee = await usuario.findOne({_id: req.user.id});
  
  
  
    const nuevaNoticia = new noticia({
        titulo,
        tema,
        resumen,
        contenido,
        editor: employee.name,
        image: result.url,
        public_id: result.public_id,
    
    });

    await nuevaNoticia.save();
    await fs.unlink(req.file.path);
    res.redirect('/list/noticias');
}

editorCtrl.editNoticia = async (req, res) => {
    const {id} = req.params;
    const {titulo, tema, contenido} = req.body;
    const employee = await usuario.findOne({_id: req.user.id});
  
  
  
    await noticia.findByIdAndUpdate({_id: id},{
        titulo,
        tema,
        contenido,
        editor: employee.name,
    });
    res.redirect('/list/noticias');
}


editorCtrl.deleteNoticia = async (req, res) => {
    const {id} = req.params;
    const noticias = await noticia.findByIdAndDelete(id);
    await cloudinary.v2.uploader.destroy(noticias.public_id);
  
    res.redirect('/list/noticias');
};


module.exports = editorCtrl;