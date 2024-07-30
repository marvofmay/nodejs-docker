const { addTokenToBlacklist } = require('../../../../utility/tokenBlacklist');

const logout = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        addTokenToBlacklist(token);

        req.logout((err) => {
            if (err) {
                return next(err);
            }

            return res.status(200).json({
                actionResult: {
                    success: true,
                    message: 'Logged out successfully. Token is now blacklisted.',
                },
            });
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            actionResult: {
                success: false,
                message: 'An unexpected error occurred',
            },
        });
    }
};

module.exports = {
    logout,
};