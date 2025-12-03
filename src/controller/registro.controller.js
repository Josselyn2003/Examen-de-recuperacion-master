const registro = {};

const passport = require('passport');

registro.mostrarRegistro = async(req, res) => {
    res.render('login/registro');
};
//registro
registro.Registro = passport.authenticate('local.signup', {
    successRedirect: '/proyecto',
    failureRedirect: '/registro',
    failureFlash: true
});

registro.mostrarLogin = (req, res, next) =>{
    res.render('login/login')
}
//login
registro.Login = passport.authenticate('local.signin', {
    successRedirect: '/inicio', //redireccion del login asia la vista de los botones
    failureRedirect: '/login',
    failureFlash: true
});

registro.cierreSesion = (req, res, next) => {
    req.logOut();
    res.redirect('/login');
};

module.exports = registro