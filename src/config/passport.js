const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const initializePassport = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password'
    }, async (login, password, done) => {
        try {
            const user = await User.findOne({ login });
            if (! user) {
                return done(null, false, { message: 'Incorrect login' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (! isMatch) {
                return done(null, false, { message: 'Incorrect password' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
};

module.exports = initializePassport;
