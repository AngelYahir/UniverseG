const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

//Esquema del usuario
const UserSchema = new Schema({
    name: {type: String, required: true},
    lastname: {type: String, required:true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required:true},
    admin: {type: Boolean, default: false },
    employee: {type: Boolean, default: false},
    editor: {type: Boolean, default: false}
}, {
    timestamps:true
});

//Usando bcrypt encriptamos la constraseña
UserSchema.methods.encriptar = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
//se encripta la contraseña y se compara con la que esta en la base de datos, si no coinciden devolvera una respuesta erronea
UserSchema.methods.compararPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
};

module.exports = model('usuarios', UserSchema);
