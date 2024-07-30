const { validationResult } = require('express-validator');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
const jwtExpiry = process.env.JWT_EXPIRY || '1h';

const login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                actionResult: {
                    success: false,
                    message: 'Validation errors',
                },
            });
        }

        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.error('Authentication error:', err);
                return next(err);
            }
            if (!user) {
                return res.status(401).json({
                    errors: [{ msg: info.message }],
                    actionResult: {
                        success: false,
                        message: 'Authentication failed',
                    },
                });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }

                // Generowanie tokenu JWT
                const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: jwtExpiry });

                return res.status(200).json({
                    actionResult: {
                        success: true,
                        message: 'Logged in successfully',
                        user: {
                            id: user.id,
                            login: user.login,
                            token,
                        },
                    },
                });
            });
        })(req, res, next);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            actionResult: {
                success: false,
                message: 'An unexpected error occurred',
            },
        });
    }
}

module.exports = {
    login,
}