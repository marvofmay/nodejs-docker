const categoryApiV1Repository = require('../../../../repositories/api/v1/category/repository');

const getCategoryById = async (req, res) => {
    try {
       const data = await categoryApiV1Repository.getCategoryById(req);

        res.json(data);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    getCategoryById,
};