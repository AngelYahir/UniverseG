const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Debes iniciar sesion para ver esta pagina, si no tienes una cuenta puedes registrarte')
    res.redirect('/inicio');
};

module.exports = helpers;