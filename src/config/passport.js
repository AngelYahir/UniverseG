const passport = require('passport');
const passportStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuarios');


passport.use(new passportStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {

    const usuario = await Usuario.findOne({email})
    if (!usuario) {
        return done(null, false, {message: 'no se encontro el usuario'});
    } else {
        const coincidencia = await usuario.compararPassword(password);
        if (coincidencia) {
            return done(null, usuario);
        } else {
            return done(null, false, {message: 'Contraseña incorrecta'});
        }
    }

}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Usuario.findById (id, (err, user) => {
        done(err, user);
    })
});