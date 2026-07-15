const mongodb= require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Users']
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    }).catch((err) => {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    });

};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Users']
    const userId = req.params.id;
    if (!objectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user id' });
    }
    const user = await mongodb.getDatabase().db().collection('users').findOne({ _id: new objectId(userId) });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(user);
};

const createUser = async (req, res) => {
    //#swagger.tags = ['Users']
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email) {
        return res.status(400).json({ error: 'firstName, lastName, and email are required' });
    }

    const user = { firstName, lastName, email, favoriteColor, birthday };
    const result = await mongodb.getDatabase().db().collection('users').insertOne(user);

    res.setHeader('Content-Type', 'application/json');
    if (result.acknowledged) {
        res.status(201).json({ _id: result.insertedId, ...user });
    } else {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags = ['Users']
    const userId = req.params.id;
    if (!objectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user id' });
    }

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    if (!firstName || !lastName || !email) {
        return res.status(400).json({ error: 'firstName, lastName, and email are required' });
    }

    const result = await mongodb.getDatabase().db().collection('users').updateOne(
        { _id: new objectId(userId) },
        { $set: { firstName, lastName, email, favoriteColor, birthday } }
    );

    if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ message: 'User updated successfully' });
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    if (!objectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user id' });
    }

    const result = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: new objectId(userId) });

    if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ message: 'User deleted successfully' });
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};