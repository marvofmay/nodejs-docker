const { validationResult } = require('express-validator');
const User = require('../../models/user');

const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        const { login, password } = req.body;

        const user = await User.findOne({ login });
        if (login && password && ! user) {
            errors.errors.push({
                msg: 'Invalid login or password',
            });
        }

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