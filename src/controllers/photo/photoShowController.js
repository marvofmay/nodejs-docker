const photoShow = async (req, res) => {
    try {
        res.json({ actionResult: '' });
    } catch (err) {
        console.error(err);

        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    photoShow,
}