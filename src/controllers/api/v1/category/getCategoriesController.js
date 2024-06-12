const categoryApiV1Repository = require('../../../../repositories/api/v1/category/repository');

const getCategories = async (req, res) => {
    try {
        const data = await categoryApiV1Repository.getCategories(req.query);

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getCategories,
};