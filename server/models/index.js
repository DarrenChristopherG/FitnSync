const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Import models
db.user = require("./user.model")(sequelize, DataTypes);
db.exercise = require("./exercise.model")(sequelize, DataTypes);
db.workout = require("./workout.model")(sequelize, DataTypes);
db.workoutLog = require("./workoutLog.model")(sequelize, DataTypes);


// --Defining Fitness Relationships--

//A User can have many workouts
db.user.hasMany(db.workout);
db.workout.belongsTo(db.user);

//A Workout consists of many WorkoutLogs
db.workout.hasMany(db.workoutLog, { as: "logs" });
db.workoutLog.belongsTo(db.workout);

//A Exercise can be part of many WorkoutLogs
db.exercise.hasMany(db.workoutLog);
db.workoutLog.belongsTo(db.exercise);

module.exports = db;