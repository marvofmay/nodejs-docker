const { validationResult } = require('express-validator');

const login = (req, res) => {
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

        res.render(
            'login/form',
            {
                title: 'Login',
                action: ' Send login form',
                user: {},
                errors: [],
                actionResult: {},
            }
        );
    } catch (error) {
        res.render('error/error', {title: 'error', message: error.message});
    }

}

module.exports = {
    login,
}