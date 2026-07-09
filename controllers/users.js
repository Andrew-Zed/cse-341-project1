const mongodb= require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {

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



// const getAllUsers = async (req, res) => {
//     try {
//         const db = mongodb.getDatabase();
//         const users = await db.db().collection('users').find().toArray();
//         res.status(200).json(users);
//     } catch (err) {
//         console.error('Error fetching users:', err);
//         res.status(500).json({ error: 'Failed to fetch users' });
//     }
// };

// const getUserById = async (req, res) => {
//     const userId = req.params.id;
//     try {
//         const db = mongodb.getDatabase();
//         const user = await db.db().collection('users').findOne({ _id: new objectId(userId) });
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         res.status(200).json(user);
//     } catch (err) {
//         console.error('Error fetching user by ID:', err);
//         res.status(500).json({ error: 'Failed to fetch user' });
//     }
// };

module.exports = {
    getAll,
    getSingle,
};