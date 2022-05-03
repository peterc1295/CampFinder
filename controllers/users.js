const User = require('../models/user.js');

module.exports.renderRegister = async(req, res) => {
    res.render('auth/register');
}

module.exports.register = async (req, res) => {
    try{
        const {email, username, password} = req.body;
        const user = new User ({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) return next(err);
        });
        req.flash('success', 'Welcome to YelpCamp');
        res.redirect('/campgrounds');
    } catch (e) {
        req.flash('error', 'Username is taken');
        res.redirect('/register');
    }
}

module.exports.login = async (req, res) => {
    const redirectUrl = req.session.returnTo || '/campgrounds'
    req.flash('success', 'Welcome back');
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.renderLogin = (req, res) => {
    res.render('auth/login');
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Goodbye')
    res.redirect('/campgrounds');
}