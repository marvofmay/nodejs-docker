const { validationResult } = require('express-validator');
const passport = require('passport');

const login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (! errors.isEmpty()) {
            return res.render('login/form', {
                title: 'Login',
                action: 'Send login form',
                user: {},
                errors: errors.array(),
                actionResult: {},
            });
        }

        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.error('Authentication error:', err);
                return next(err);
            }
            if (! user) {
                console.log('Authentication failed, no user:', info.message);
                return res.render('login/form', {
                    title: 'Login',
                    action: 'Send login form',
                    user: {},
                    errors: [{ msg: info.message }],
                    actionResult: {}
                });
            }
            req.logIn(user, (err) => {
                if (err) {
                    console.error('Login error:', err);
                    return next(err);
                }
                console.log('User logged in:', user);
                return res.redirect('/');
            });
        })(req, res, next);
    } catch (error) {
        res.render('error/error', { title: 'error', message: error.message });
    }
}

module.exports = {
    login,
}
