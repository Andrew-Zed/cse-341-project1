const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    //#swagger.tags = ['Users']
    try {
        const users = await mongodb.getDatabase().db().collection('users').find().toArray();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

const getSingle = async (req, res, next) => {
    //#swagger.tags = ['Users']
    try {
        const user = await mongodb.getDatabase().db().collection('users').findOne({ _id: new ObjectId(req.params.id) });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

const createUser = async (req, res, next) => {
    //#swagger.tags = ['Users']
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;
        const user = { firstName, lastName, email, favoriteColor, birthday };
        const result = await mongodb.getDatabase().db().collection('users').insertOne(user);

        if (!result.acknowledged) {
            return res.status(500).json({ error: 'Failed to create user' });
        }
        res.status(201).json({ _id: result.insertedId, ...user });
    } catch (err) {
        next(err);
    }
};

const updateUser = async (req, res, next) => {
    //#swagger.tags = ['Users']
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;
        const result = await mongodb.getDatabase().db().collection('users').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { firstName, lastName, email, favoriteColor, birthday } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    //#swagger.tags = ['Users']
    try {
        const result = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: new ObjectId(req.params.id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};
