/* eslint-disable no-process-env */
import Sequelize from 'sequelize';

// import models
import AquaGSM from './aquaGSM.model.js';
import TcPro from './tcPro.model.js';

const { DB_USERNAME, DB_PASSWORD, DB_URL, DB_NAME, DB_DIALECT } = process.env;
const POOL = {
    max: process.env.DB_POOL_MAX || 5,
    min: process.env.DB_POOL_MIN || 0,
    acquire: process.env.DB_POOL_ACQUIRE || 30000,
    idle: process.env.DB_POOL_IDLE || 10000,
};

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_URL,
    dialect: DB_DIALECT,
    pool: POOL
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// import models and add to db object
db.AquaGSM = AquaGSM(sequelize, Sequelize);
db.TcPro = TcPro(sequelize, Sequelize);

export default db;
