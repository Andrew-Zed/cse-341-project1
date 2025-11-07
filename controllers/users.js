const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().collection('users').find();
        const users = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

const getSingle = async (req, res) => {
    try {
        const userId = req.params.id;

        let result = await mongodb.getDatabase().collection('users').findOne({ _id: userId });

        if (!result && ObjectId.isValid(userId)) {
            const objectId = new ObjectId(userId);
            result = await mongodb.getDatabase().collection('users').findOne({ _id: objectId });
        }

        if (!result) {
            return res.status(404).json({
                message: 'User not found',
                searchedId: userId
            });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

module.exports = {
    getAll,
    getSingle
}