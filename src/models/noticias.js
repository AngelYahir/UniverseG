const {Schema, model} = require('mongoose');

const noticiaSchema = new Schema({

    titulo: {type: String, required: true},
    tema: {type: String, required: true},
    resumen: {type: String, required: true},
    contenido: {type: String, required: true},
    editor: {type: String, required: true},
    image: {type: String, required: true},
    public_id: {type: String, required: true}
}, {
    timestamps: true
});

module.exports = model('noticias', noticiaSchema);