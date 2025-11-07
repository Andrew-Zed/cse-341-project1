const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Database already initialized.');
        return callback(null, database);
    }

    const uri = process.env.MONGODB_URL;
    if (!uri) {
        return callback(new Error('MONGODB_URL is not defined in environment variables.'));
    }

    MongoClient.connect(uri)
        .then((client) => {
            database = client.db();
            console.log('MongoDB connected.');
            callback(null, database);
        })
        .catch((err) => {
            console.error('MongoDB connection error:', err);
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) throw new Error('Database not initialized.');
    return database;
};

module.exports = { initDb, getDatabase };
