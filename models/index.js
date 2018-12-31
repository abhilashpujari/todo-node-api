const Sequelize = require('sequelize');

const DB_TYPE = process.env.DATABASE_TYPE || 'mysql';
const DB_HOST = process.env.DATABASE_HOST || 'localhost';
const DB_NAME = process.env.DATABASE_NAME || 'todo-api';
const DB_USER = process.env.DATABASE_USER || 'root';
const DB_PASSWORD = process.env.DATABASE_PASSWORD || '';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_TYPE,
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = {};

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;