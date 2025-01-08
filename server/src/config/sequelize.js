const SequelizeLibrary = require("sequelize");
require('dotenv').config({ path: '.env' });

const sequelizeConfig = new SequelizeLibrary(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: "postgres",		
        operatorsAliases: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
);

const db = {};

db.SequelizeLbr = SequelizeLibrary;
db.sequelizeCfg = sequelizeConfig;

// Definir modelos
db.profile = require("../models/profile.model")(sequelizeConfig, SequelizeLibrary);
db.computer = require("../models/computer.model")(sequelizeConfig, SequelizeLibrary);
db.entSal = require("../models/entSal.model")(sequelizeConfig, SequelizeLibrary);
db.pqrs = require("../models/pqrs.model")(sequelizeConfig, SequelizeLibrary);
db.user = require("../models/user.model")(sequelizeConfig, SequelizeLibrary);

module.exports = db;
