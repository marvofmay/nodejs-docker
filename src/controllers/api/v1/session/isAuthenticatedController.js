const isAuthenticated = async (req, res) => {
    try {
        if (req.session.isAuthenticated) {
            res.status(200).json({ isAuthenticated: true, user: req.user });
        } else {
            res.status(401).json({ isAuthenticated: false });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    isAuthenticated,
};