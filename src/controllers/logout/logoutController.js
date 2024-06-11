const ensureAuthenticated = require("../../middleware/auth");
const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
}

module.exports = {
    logout,
}
